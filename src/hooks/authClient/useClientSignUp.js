import axios from "axios";
import { setUser } from "../../redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const useClientSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const step1 = async (contact, type) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {email: contact};
      console.log(payload)
      const response = await axios.post(
        `${import.meta.env.VITE_API_GLOBAL_URL}/student/auth/register-step-one`,
        payload
      );
      return response.data;
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const step2 = async (contact, otp, type) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {[type]: contact, otp};
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_GLOBAL_URL}/student/auth/register-step-two`,
        payload
      );
      console.log(response.data)
      return response.data;
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const step3 = async (registrationData, token) => {
    setLoading(true);
    setError(null);
    console.log(registrationData)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_GLOBAL_URL}/student/auth/register-step-three`,
        registrationData,
        {
          headers: {
            Authorization: `Bearer ${token} type=register`
          }
        }
      );
      dispatch(setUser(response.data));
      return response.data;
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { step1, step2, step3, loading, error };
};