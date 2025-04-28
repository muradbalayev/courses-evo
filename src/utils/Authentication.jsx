import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearTokens, setTokens } from '../redux/slice/authSlice';

const Authentication = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Initialize tokens from storage
  useEffect(() => {
    dispatch(
      setTokens({
        refreshToken:
          localStorage.getItem('refreshToken') ||
          sessionStorage.getItem('refreshToken'),
        accessToken: null,
      })
    );
  }, [dispatch]);

  // Helper function to clear auth data - memoized with useCallback
  const clearAuthData = useCallback(() => {
    dispatch(clearTokens());
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('refreshToken');
  }, [dispatch]);

  // Handle authentication initialization
  useEffect(() => {
    const initializeAuth = async () => {
      const refreshToken =
        localStorage.getItem('refreshToken') ||
        sessionStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_GLOBAL_URL}/admin/auth/refresh-token`,
            {
              headers: {
                Authorization: `Bearer ${refreshToken} type=refresh`,
                'Content-Type': 'application/json',
              },
              method: 'POST',
            }
          );

          const contentType = response.headers.get('content-type');
          if (!response.ok) {
            clearAuthData();
            return;
          }
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Server returned non-JSON response');
          }

          const data = await response.json();
          const { accessToken } = data;
          dispatch(setTokens({ accessToken, refreshToken }));
        } catch (error) {
          console.log('Token refresh failed:', error);
          clearAuthData();
        }
      } else {
        dispatch(clearTokens());
      }

      setLoading(false);
    };

    initializeAuth();
  }, [dispatch, navigate, clearAuthData]);



  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[90vh]">
        <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></span>
        <span className="ml-3 text-lg font-semibold"></span>
      </div>
    );
  }

  return children;
};

export default Authentication;
