import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBook, FaSellcast, FaTeamspeak, FaUser } from "react-icons/fa6";
import { useCallback, useEffect, useRef } from "react";
import { BiLogOut } from "react-icons/bi";
import { motion } from "framer-motion";
import "./Sidebar.css";
import { BiBook } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import useLogout from "../../../hooks/useLogout";

const Sidebar = ({ isMobileOpen, setIsMobileOpen, menuButtonRef }) => {
  const mobileSidebarRef = useRef(null);
  const navigate = useNavigate();
  const logout = useLogout();

  const handleClickOutside = useCallback(
    (event) => {
      if (
        mobileSidebarRef.current &&
        !mobileSidebarRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMobileOpen(false);
      }
    },
    [setIsMobileOpen, menuButtonRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const SIDEBARITEMS = [
    {
      id: 1,
      title: "Instructors",
      icon: <FaUser size={20} />,
      path: "/admin/dashboard",
    },
    // {
    //   id: 2,
    //   title: "Applies",
    //   icon: <BiBook size={20} />,
    //   path: "/admin/dashboard/applies",
    // },
  ];

  return (
    <>
      <div className="sidebar md:min-w-52 sm:min-w-40 sm:flex hidden relative bg-gray-900">
        <button title="Home" className="z-10" onClick={() => navigate("/")}>
          <FaHome
            size={25}
            className="text-gray-300 absolute top-3 left-3 transition-opacity"
          />
        </button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center py-6"
        >
          <div className="p-4 cursor-pointer bg-gradient-to-tr bg-white rounded-xl mb-3">
            <FaUser color="black" className="text-3xl" />
          </div>
          <h3 className="text-sm font-semibold text-white">Admin Panel</h3>
        </motion.div>
        <nav className="links z-0 overflow-auto mb-4 px-3">
          {SIDEBARITEMS.map((item) => (
            <NavLink
              key={item.id}
              className={({ isActive }) => `
                flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all
                text-sm font-medium
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }
              `}
              to={item.path}
              end
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-3 pb-4">
          <Link
            style={{ willChange: "transform" }}
            to="/"
            className="w-full mb-2 flex items-center justify-center p-3 pr-5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
          >
            <FaHome size={20} className="mr-2" />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center p-3 rounded-xl
          bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
          >
            <BiLogOut className="mr-2 text-lg" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>

      <div
        ref={mobileSidebarRef}
        className={`mobile-sidebar bg-gray-900 w-[80%] z-10 sm:hidden fixed ${
          isMobileOpen ? "left-0" : "-left-full"
        }`}
      >
        <div className="w-full flex flex-col gap-3 items-center justify-start mt-6">
          <button title="Home" className="z-10" onClick={() => navigate("/")}>
            <FaHome
              size={25}
              className="text-gray-300 absolute top-3 left-3 transition-opacity"
            />
          </button>
          <div className="profile-img flex bg-gray-800 rounded-full transition duration-300 sm:p-5 p-3">
            <FaUser className="text-gray-300" size={50} />
          </div>
          <h3 className="text-sm text-white text-center">Admin Panel</h3>
        </div>
        <nav className="links w-full mt-10 overflow-auto mb-4 px-3">
          {SIDEBARITEMS.map((item) => (
            <NavLink
              key={item.id}
              className={({ isActive }) => `
                flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all
                text-sm font-medium
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }
              `}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              end
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <motion.div
          className="px-3 py-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-full mb-4 flex items-center justify-center p-3 pr-5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
          >
            <FaHome size={20} className="mr-2" />
            <span className="text-sm font-medium">Home</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center p-3 pr-5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
          >
            <BiLogOut className="mr-2 text-lg" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default Sidebar;
