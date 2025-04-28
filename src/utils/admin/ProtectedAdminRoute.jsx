import React from "react"; 
import { useSelector } from "react-redux";
import NotFound from "../NotFound";

const ProtectedAdminRoute = ({ children }) => {
  const { accessToken } = useSelector((state) => state.auth);
  // const location = useLocation();
  if (!accessToken) {
    return <NotFound />;
  }

  return children;
};

export default ProtectedAdminRoute;
