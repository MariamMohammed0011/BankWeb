import { useState } from "react";
import { useAxios } from "../hooks/useAxios";

export const useAddEmployee = () => {
  const axios = useAxios();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addEmployee = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
       const form = new FormData();
       form.append("Email", formData.email);
       form.append("Username", formData.username);
       form.append("Role", formData.role);
       form.append("FirstName", formData.firstName);
       form.append("MiddleName", formData.middleName);
       form.append("LastName", formData.lastName);
        form.append("IdentityNumber", formData.identityNumber);
         form.append("Phone", formData.phone);
         
      

      await axios.post("/employees/create", form);
console.log('33');
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Error adding employee");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addEmployee,
    loading,
    error,
    success,
  };
};
