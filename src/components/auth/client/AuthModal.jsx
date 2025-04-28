import { useState } from "react";
import { IoClose } from "react-icons/io5";
import ClientLogin from "./ClientLogin";
import ClientSignUp from "./ClientSignUp";
import './Auth.css';
import { useAuthModal } from "../../../hooks/authClient/useAuthModal";

const AuthModal = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { isOpen, closeAuthModal } = useAuthModal();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/40 backdrop-blur-[2px] z-50 flex items-center justify-center animate-fadeIn">
      <div className="bg-white w-full max-w-[580px] max-h-[700px] overflow-y-auto relative animate-slideIn shadow-xl rounded-lg">
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <IoClose size={24} />
        </button>

        <div className="px-[100px] pt-[50px] pb-[20px]">
          {activeTab === 0 && (
            <div className="animate-fadeIn">
              <ClientLogin onClose={closeAuthModal} />
            </div>
          )}
          {activeTab === 1 && (
            <div className="animate-fadeIn">
              <ClientSignUp onClose={closeAuthModal} />
            </div>
          )}
        </div>
          <div>
            {activeTab === 1 && (
              <div
                className={`w-full flex gap-2 justify-center py-4 text-center transition-all duration-200`}
              >
                <p className="text-[#3B3B3B] font-[400]">
                  Already have an account?
                </p>
                <button className="text-[#0C0C0C] font-[500]" onClick={() => setActiveTab(0)}>Log in</button>
              </div>
            )}
            {activeTab === 0 && (
              <div
              className={`w-full flex gap-2 justify-center py-4 text-center transition-all duration-200`}
              >
                <p className="text-[#3B3B3B] font-[400]">
                  Don&apos;t you have an account?
                </p>
                <button className="text-[#0C0C0C] font-[500]" onClick={() => setActiveTab(1)}>Sign Up</button>
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default AuthModal;
