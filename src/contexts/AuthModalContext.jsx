import { createContext, useState } from 'react';

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAuthModal = () => {
    setIsOpen(true);
  };

  const closeAuthModal = () => {
    setIsOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{ isOpen, openAuthModal, closeAuthModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export default AuthModalContext;
