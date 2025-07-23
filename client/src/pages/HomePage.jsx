import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiLock, FiUserPlus, FiShield, FiRefreshCw } from 'react-icons/fi';

function HomePage() {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const features = [
    {
      icon: <FiUserPlus className="w-6 h-6 text-primary-500" />,
      title: 'Secure Authentication',
      description: 'Create an account with email and password for personalized access.',
    },
    {
      icon: <FiLock className="w-6 h-6 text-primary-500" />,
      title: 'JWT Tokens',
      description: 'Enhanced security with JSON Web Tokens for authentication.',
    },
    {
      icon: <FiRefreshCw className="w-6 h-6 text-primary-500" />,
      title: 'Token Refresh',
      description: 'Seamless session management with automatic token refresh.',
    },
    {
      icon: <FiShield className="w-6 h-6 text-primary-500" />,
      title: 'Profile Dashboard',
      description: 'Access your personal profile to manage your account details.',
    },
  ];

  return (
    <div className="container-lg px-4">
      <section className="py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-900">
            Secure User Authentication
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            A modern MERN stack application with JWT-based authentication,
            access tokens and refresh tokens for secure session management.
          </p>
          
          {user ? (
            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary px-8 py-3 text-lg"
              >
                Go to Profile
              </motion.button>
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-ghost px-8 py-3 text-lg w-full sm:w-auto"
                >
                  Sign In
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary px-8 py-3 text-lg w-full sm:w-auto"
                >
                  Create Account
                </motion.button>
              </Link>
            </div>
          )}
        </motion.div>
      </section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12 md:py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center bg-primary-50 w-12 h-12 rounded-full mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="py-12 md:py-16 bg-primary-50 rounded-xl"
      >
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-gray-600 mb-8">
            Join our growing community today and experience the security and
            performance of a modern authentication system.
          </p>
          
          {user ? (
            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary px-8 py-3"
              >
                Visit Your Profile
              </motion.button>
            </Link>
          ) : (
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary px-8 py-3"
              >
                Create Account
              </motion.button>
            </Link>
          )}
        </div>
      </motion.section>
    </div>
  );
}

export default HomePage;