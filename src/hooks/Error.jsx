import { FiAlertCircle } from "react-icons/fi";
import { LuRefreshCw } from "react-icons/lu";
import { motion } from "framer-motion";

const Error = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-red-500/10 backdrop-blur-sm flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 max-w-md w-full mx-4"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <FiAlertCircle size={32} className="text-red-600" />
        </div>
        <h2 className="text-red-600 text-xl font-semibold text-center">Oops! Something went wrong</h2>
        <p className="text-gray-600 text-center">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <LuRefreshCw size={18} />
          Refresh Page
        </button>
      </motion.div>
    </div>
  );
};

export default Error; 