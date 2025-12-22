import { useState } from "react";
import { useAxios } from "../hooks/useAxios";
export const useTransactionService = () => {
  const axios = useAxios();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
const deposit = async (formData) => {
  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    const res = await axios.post("/transactions/deposit", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setSuccess("تمت عملية الإيداع بنجاح ✔");
    return { success: res.data.message || "تمت عملية الإيداع بنجاح ✔" };
  } catch (err) {
    const msg = err.response?.data?.message || "حدث خطأ أثناء الإيداع";
    setError(msg);
    return { error: msg };
  } finally {
    setLoading(false);
  }
};

const withdrawal = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.post("/transactions/withdrawal", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const message = res.data.message || "تمت عملية السحب بنجاح ✔";
      setSuccess(message);
      return { success: message };
    } catch (err) {
      const msg = err.response?.data?.message || "حدث خطأ أثناء السحب";
      setError(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };
const transfer = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.post("/transactions/transfer", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const message = res.data.message || "تمت عملية التحويل بنجاح ✔";
      setSuccess(message);
      return { success: message };
    } catch (err) {
      const msg = err.response?.data?.message || "حدث خطأ أثناء التحويل";
      setError(msg);
      return { error: msg };
    } finally {
      setLoading(false);
    }
  };
  return { deposit,withdrawal,transfer, loading, error, success };
};
