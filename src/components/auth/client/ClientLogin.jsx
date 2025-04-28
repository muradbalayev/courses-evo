import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import useClientLogin from '../../../hooks/authClient/useClientLogin';

const ClientLogin = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
const [showPassword, setShowPassword] = useState(false);
  const login = useClientLogin(true); 


  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShake(true);
      setTimeout(() => setShake(false), 650);
      return;
    }

    try {
      // TODO: Implement login logic
      console.log('Login data:', formData);
      login(formData.username, formData.password, rememberMe);
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900">Log in</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-[#0C0C0C]">
            İstifadəçi adı
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder='İstifadəçi adı'
            required
            value={formData.username}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm transition-colors duration-200 ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            } ${errors.username && shake ? 'animate-shake' : ''}`}
          />
          {errors.username && (
            <p className={`mt-1 text-sm text-red-500 ${shake ? 'animate-shake' : ''}`}>
              {errors.username}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#0C0C0C]">
            Şifrə
          </label>
          <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder='Şifrə'
            required
            value={formData.password}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm transition-colors duration-200 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } ${errors.password && shake ? 'animate-shake' : ''}`}
          />
          {errors.password && (
            <p className={`mt-1 text-sm text-red-500 ${shake ? 'animate-shake' : ''}`}>
              {errors.password}
            </p>
          )}
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2">
            {showPassword ? (
              <FaEye size={21} className="text-gray-500"/>
            ) : (
              <FaEyeSlash size={22} className="text-gray-500"/>
            )}
          </button>
          </div>
        </div>
        <div className="w-full flex gap-2 items-center font-medium text-sm mt-2">
                    <p>Remember me</p>

                    <input
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        type="checkbox" className="hidden" />

                    <div className="checkbox-wrapper-31" onClick={() => setRememberMe(!rememberMe)}>
                        <input type="checkbox" />
                        <svg viewBox="0 0 35.6 35.6">
                            <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                            <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                            <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                        </svg>
                    </div>



                </div>
      </div>

      <button
        type="submit"
        className="p-4 w-full text-center bg-[#0C0C0C] text-white hover:bg-[#0c0c0cd6] transition-colors duration-200"
        >
        Log in
      </button>
    </form>
  );
};

export default ClientLogin;