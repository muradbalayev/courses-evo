import React from "react"; 
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-9xl font-bold text-black dark:text-white">404</h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 bg-black dark:bg-white mx-auto my-8"
          />
          
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
            Səhifə tapılmadı
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Axtardığınız səhifə mövcud deyil və ya başqa ünvana köçürülüb.
          </p>
          
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ease: "easeInOut", duration: 0.3}}
              className="bg-black text-white dark:bg-white dark:text-black py-3 px-8 rounded-md font-medium transition-colors hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Ana Səhifəyə Qayıt
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;