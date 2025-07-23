import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function NotFoundPage() {
  return (
    <div className="container-md flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <h1 className="text-8xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <motion.button
            className="btn btn-primary px-6 py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;