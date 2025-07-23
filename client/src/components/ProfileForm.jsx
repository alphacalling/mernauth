import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiEdit, FiSave } from 'react-icons/fi';

function ProfileForm() {
  const { user, updateProfile, error, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  // Initialize form with user data when it's available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        bio: user.bio || '',
      });
    }
  }, [user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: '' });
    }
    
    // Clear success message when user makes changes
    if (success) {
      setSuccess(false);
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (formData.password && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Only include password if it was entered
      const userData = {
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
      };
      
      if (formData.password) {
        userData.password = formData.password;
      }
      
      const result = await updateProfile(userData);
      
      if (result) {
        setSuccess(true);
        // Clear password fields after successful update
        setFormData({
          ...formData,
          password: '',
          confirmPassword: '',
        });
      }
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-8 w-full max-w-md mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        <FiEdit className="text-primary-500 text-xl" />
      </div>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-error-100 border border-error-300 text-error-700 px-4 py-3 rounded mb-4"
        >
          {error}
        </motion.div>
      )}
      
      {success && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-success-100 border border-success-300 text-success-700 px-4 py-3 rounded mb-4"
        >
          Profile updated successfully!
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label flex items-center">
            <FiUser className="mr-2" />
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`input ${validationErrors.name ? 'input-error' : ''}`}
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
          {validationErrors.name && (
            <p className="form-error">{validationErrors.name}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label flex items-center">
            <FiMail className="mr-2" />
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`input ${validationErrors.email ? 'input-error' : ''}`}
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
          {validationErrors.email && (
            <p className="form-error">{validationErrors.email}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="3"
            className="input"
            value={formData.bio}
            onChange={handleChange}
            disabled={loading}
            placeholder="Tell us a little about yourself"
          />
        </div>
        
        <div className="my-6 border-t border-gray-200"></div>
        
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        <p className="text-gray-600 text-sm mb-4">
          Leave blank to keep your current password
        </p>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`input ${validationErrors.password ? 'input-error' : ''}`}
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
          {validationErrors.password && (
            <p className="form-error">{validationErrors.password}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`input ${validationErrors.confirmPassword ? 'input-error' : ''}`}
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />
          {validationErrors.confirmPassword && (
            <p className="form-error">{validationErrors.confirmPassword}</p>
          )}
        </div>
        
        <div className="mt-6">
          <motion.button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              <>
                <FiSave className="mr-2" />
                Save Changes
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default ProfileForm;