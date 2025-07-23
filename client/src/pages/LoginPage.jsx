import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import { motion } from 'framer-motion';

function LoginPage() {
  const { login, user, error, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);
  
  const handleLogin = async (email, password) => {
    const success = await login(email, password);
    if (success) {
      navigate('/profile');
    }
  };
  
  return (
    <div className="container-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
        <p className="text-gray-600">
          Sign in to access your account and dashboard
        </p>
      </motion.div>
      
      <AuthForm
        isLogin={true}
        onSubmit={handleLogin}
        error={error}
        loading={loading}
      />
    </div>
  );
}

export default LoginPage;