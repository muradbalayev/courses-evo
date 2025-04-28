import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-[#214440]/10 backdrop-blur-sm flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <FaGraduationCap size={40} className="text-[#214440]" />
        </motion.div>
        <h2 className="text-[#214440] text-xl font-medium">Loading...</h2>
        <div className="w-48 h-1.5 bg-[#214440]/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
            className="w-full h-full bg-[#214440] rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Loading; 