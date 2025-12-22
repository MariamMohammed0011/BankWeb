import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useMemo } from "react";

export const useAxios = () => {
  const { getToken } = useAuth();

  const instance = useMemo(() => {
    const inst = axios.create({
      baseURL: "https://localhost:44360/api",
    });

    
    inst.interceptors.request.use((config) => {
      const token = getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;

      console.log("TOKEN SENT:", token);
      return config;
    });

    
    inst.interceptors.response.use(
      (response) => {
        console.log("RESPONSE RECEIVED:", {
          status: response.status,
          data: response.data,
        });
        return response;
      },
      (error) => {
        console.log("RESPONSE ERROR:", {
          status: error?.response?.status,
          data: error?.response?.data,
        });
        return Promise.reject(error);
      }
    );

    return inst;
  }, [getToken]); 
  return instance;
};
