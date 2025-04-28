import { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);
  const changePassword = async (oldPassword, newPassword) => {
    setIsLoading(true);


    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_GLOBAL_URL}/api/admin/auth/change-password`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken} type=access`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to change password');
      }

      Swal.fire({
        title: "Uğurla dəyişdirildi!",
        text: "Şifrəniz uğurla dəyişdirildi.",
        icon: "success",
        confirmButtonText: "Bağla",
        confirmButtonColor: "#AC8968",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        customClass: {
          confirmButton:
            "px-6 py-2.5  text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#AC8968]/30",
        },
      });
      return true;
    } catch (error) {
      console.log('Error:', error);
      Swal.fire({
        title: "Xəta!",
        text: error.message || "Şifrə dəyişdirilmədi. Xahiş edirik bir daha cəhd edin.",
        icon: "error",
        confirmButtonText: "Bağla",
        confirmButtonColor: "#AC8968",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading };
};

export default useChangePassword;
