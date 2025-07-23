import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function AuthForm({ 
  isLogin = true, 
  onSubmit, 
  error, 
  loading 
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!isLogin && !formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isLogin) {
        onSubmit(formData.email, formData.password);
      } else {
        onSubmit(formData.name, formData.email, formData.password);
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
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? 'Welcome Back' : 'Create an Account'}
      </h2>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-error-100 border border-error-300 text-error-700 px-4 py-3 rounded mb-4"
        >
          {error}
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name" className="form-label">
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
        )}
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">
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
          <label htmlFor="password" className="form-label">
            Password
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
        
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
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
        )}
        
        <div className="mt-6">
          <motion.button
            type="submit"
            className="btn btn-primary w-full"
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
                Processing...
              </span>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </motion.button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link 
            to={isLogin ? "/register" : "/login"} 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default AuthForm;