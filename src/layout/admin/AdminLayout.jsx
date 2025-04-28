import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar/Sidebar"
import { useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import "../../styles/admin/Admin.css";
const AdminLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuButtonRef = useRef(null)

  return (
    <div className="admin flex relative h-screen overflow-x-hidden overflow-y-auto w-full  text-white">
    <div
      ref={menuButtonRef}
      className="menu-btn-wrapper"
      onClick={() => setIsMobileOpen(!isMobileOpen)}
    >
      <IoMenu
        className="bg-[#2f2f2f] rounded-xl p-2 z-40 sm:hidden block absolute top-5 right-5 cursor-pointer"
        size={40}
        color="white"
      />
    </div>

    <Sidebar
      isMobileOpen={isMobileOpen}
      setIsMobileOpen={setIsMobileOpen}
      menuButtonRef={menuButtonRef}
    />
    <Outlet />
  </div>
  )
}

export default AdminLayout
