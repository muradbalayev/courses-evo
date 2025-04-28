import React, { useEffect, useState } from "react";
import Authentication from "../utils/Authentication";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "../utils/admin/PublicRoute";
import ProtectedAdminRoute from "../utils/admin/ProtectedAdminRoute";
import AdminLayout from "../layout/admin/AdminLayout";
import AdminLogin from "./admin/Login/AdminLogin";
import InstructorLayout from "../layout/instructor/InstructorLayout";
import ClientLayout from "../layout/client/ClientLayout";
import HomePage from "./client/Home/HomePage";
import { AuthModalProvider } from "../contexts/AuthModalContext";
import AuthModal from "../components/auth/client/AuthModal";

import AdminInstructorsPage from "./admin/AdminInstructorsPage";
import InstructorDashboard from "./instructor/InstructorDashboard";

const RouterApp = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if current path starts with /admin
    const checkAdminRoute = () => {
      setIsAdminRoute(window.location.pathname.startsWith("/admin"));
    };

    // Initial check
    checkAdminRoute();

    // Listen for route changes
    window.addEventListener("popstate", checkAdminRoute);
    return () => window.removeEventListener("popstate", checkAdminRoute);
  }, []);

  return (
    <div className="overflow-hidden relative">
      <BrowserRouter>
        <AuthModalProvider>
          <Authentication>
            <AppRoutes />
            <AuthModal />
          </Authentication>
        </AuthModalProvider>
      </BrowserRouter>
    </div>
  );
};

function AppRoutes() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route
        path="/admin/login"
        element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<AdminInstructorsPage />} />
      </Route>

      {/* User Routes */}
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      {/* Instructors Routes */}
      <Route path="/instructor/dashboard" element={<InstructorLayout />}>
        <Route index element={<InstructorDashboard />} />
      </Route>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default RouterApp;
