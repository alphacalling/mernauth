import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Register a new user
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("/users", {
        name,
        email,
        password,
      });

      setUser(response.data);
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("/users/login", {
        email,
        password,
      });

      setUser(response.data);
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      await axios.post("/users/logout");
      setUser(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Logout failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Get user profile
  const getProfile = async () => {
    try {
      setError(null);

      const response = await axios.get("/users/profile");
      setUser(response.data);
      return response.data;
    } catch (err) {
      if (err.response?.status !== 401) {
        setError("Failed to fetch profile. Please try again.");
      }
      return null;
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.put("/users/profile", userData);
      setUser(response.data);
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Profile update failed. Please try again."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/users/profile");
      setUser(response.data);
    } catch (err) {
      setUser(null);

      // Try to refresh token if 401 error
      if (err.response?.status === 401) {
        try {
          await axios.post("/users/refresh");
          // If refresh successful, try to get profile again
          const response = await axios.get("/users/profile");
          setUser(response.data);
        } catch (refreshErr) {
          // If refresh fails, user is truly logged out
          setUser(null);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Create axios response interceptor to handle token expiration
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and not from /refresh endpoint
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url?.includes("/refresh")
        ) {
          originalRequest._retry = true;

          try {
            // Try to refresh the token
            await axios.post("/users/refresh");
            // Retry the original request
            return axios(originalRequest);
          } catch (refreshError) {
            // If refresh fails, redirect to login
            setUser(null);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
