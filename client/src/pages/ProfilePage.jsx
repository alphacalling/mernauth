import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileForm from '../components/ProfileForm';
import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';

function ProfilePage() {
  const { user, getProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      await getProfile();
      setLoading(false);
    };
    
    fetchData();
  }, [getProfile]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="container-md text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="text-gray-600">
          Please log in to access your profile.
        </p>
      </div>
    );
  }
  
  return (
    <div className="container-md">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-4">
          {user.profilePicture ? (
            <img 
              src={user.profilePicture} 
              alt={user.name} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <FiUser className="w-8 h-8 text-primary-600" />
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-600 mb-4">{user.email}</p>
        {user.bio && (
          <p className="text-gray-700 max-w-lg mx-auto">{user.bio}</p>
        )}
      </motion.div>
      
      <div className="mb-8">
        <ProfileForm />
      </div>
    </div>
  );
}

export default ProfilePage;