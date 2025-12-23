import { useState } from "react";
import { useAxios } from "../hooks/useAxios";

export const useAccountStateService = () => {
  const axios = useAxios();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Change account or sub-account state
   * @param {"client"|"sub"} type
   * @param {number} id
   * @param {"close"|"activate"|"freeze"|"suspend"} action
   */
  const changeState = async (type, id, action) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.post(
        `/AccountState/${action}/${type}/${id}`
      );

      const msg = res.data?.message || "تم تحديث حالة الحساب";
      setSuccess(msg);
      return { success: msg };
    } catch (err) {
      const msg = err.response?.data?.message || "خطأ أثناء تحديث الحالة";
      setError(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };

  return {
    changeState,
    loading,
    error,
    success,
  };
};
