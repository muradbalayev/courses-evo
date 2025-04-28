import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTokens } from "../../redux/slice/authSlice";
import { setUser } from "../../redux/slice/userSlice";
// import { setUser } from "../redux/slices/userSlice";

// useLogin.js
const useClientLogin = (isStudent = false) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async (username, password, rememberMe) => {
    try {
      const url = isStudent
        ? `${import.meta.env.VITE_API_GLOBAL_URL}/student/auth/login`
        : `${import.meta.env.VITE_API_GLOBAL_URL}/instructor/auth/login`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      const { refreshToken, accessToken } = data.tokens;

      dispatch(
        setTokens({
          accessToken,
          refreshToken,
          role: isStudent ? "student" : "instructor",
        })
      );

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("refreshToken", refreshToken);
      storage.setItem("role", isStudent ? "student" : "instructor");

      // Clear opposite storage
      const oppositeStorage = rememberMe ? sessionStorage : localStorage;
      oppositeStorage.removeItem("refreshToken");
      oppositeStorage.removeItem("role");


      const userResponse = await fetch(
        `${import.meta.env.VITE_API_GLOBAL_URL}/${isStudent ? "student" : "instructor"}/account/user-me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (userResponse.ok) {
        const userData = await userResponse.json();
        dispatch(setUser(userData.user));
        toast.success(`${userData.user.firstName + " " + userData.user.secondName} logged in.`);
      }
      

      toast.success(`${username} logged in.`);

      navigate(isStudent ? "/student/dashboard" : "/instructor/dashboard");
    } catch (error) {
      toast.error(error.message || "Login failed");
      console.error(error);
    }
  };
  return login;
};

export default useClientLogin;
