import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { motion } from 'framer-motion';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">
              © {currentYear} MERN Auth App. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, color: '#1DA1F2' }}
              className="text-gray-600 hover:text-primary-600"
              aria-label="Twitter"
            >
              <FiTwitter size={20} />
            </motion.a>
            
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, color: '#0A66C2' }}
              className="text-gray-600 hover:text-primary-600"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={20} />
            </motion.a>
            
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, color: '#24292F' }}
              className="text-gray-600 hover:text-primary-600"
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;