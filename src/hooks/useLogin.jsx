
import { useState } from "react";
import { useAxios } from "./useAxios";

export const useLogin = () => {
  const axios = useAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginRequest = async (Username, password) => {
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Username", Username);
      formData.append("Password", password);

      const response = await axios.post("/employees/login", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Username or password");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginRequest, loading, error };
};
