import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTokens } from "../redux/slice/authSlice";

const useLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const login = async (username, password, rememberMe) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_GLOBAL_URL}/admin/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                throw new Error('Login failed');
            }
    
            const data = await response.json();
            const { refreshToken, accessToken } = data.tokens;
    
            dispatch(setTokens({ accessToken, refreshToken }));
    
            if (rememberMe) {
                localStorage.setItem('refreshToken', refreshToken);
            } else {
                sessionStorage.setItem('refreshToken', refreshToken);
            }
    
            toast.success(`${username} logged in.`);
     
            navigate('/admin/dashboard');
        } catch (error) {
            toast.error('Login failed');
            console.error(error);
        }
    };
  return login
}

export default useLogin
