import { useEffect } from 'react';
import { api } from '@/config/axios.js'; 
import { useAuth } from '@/store/AuthContext.jsx';
import { refreshAccessToken } from '@/api/AuthApi';


const axiosPrivate = api; 

export const useAxiosPrivate = () => {
  const { accessToken, setAccessToken, logout } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && 
            error.response.data.message === "Token expired" && 
            !prevRequest?.sent) {
          
          prevRequest.sent = true;
          
          try {
            const refreshResponse = await refreshAccessToken();
            const newAccessToken = refreshResponse.data.accessToken;
            setAccessToken(newAccessToken);
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);

          } catch (refreshError) {
            console.error("Refresh token invalid, logging out.", refreshError);
            logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };

  }, [accessToken, setAccessToken, logout]); 

  return axiosPrivate;
};
