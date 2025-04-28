import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { clearTokens } from "@/redux/slice/authSlice";
import Swal from "sweetalert2";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearTokens());
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("refreshToken");
        
        toast.success(`Logged out successfully.`);
        navigate("/");
      }
    });
  };

  return logout;
};

export default useLogout;
