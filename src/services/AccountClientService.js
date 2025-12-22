import { useState } from "react";
import { useAxios } from "../hooks/useAxios";

export const useAccountService = () => {
  const axios = useAxios();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * @param {number} clientId
   * @param {number} accountTypeId
   * @param {number} balance
   * @param {string} createdAt 
   */
  const addAccount = async (clientId, accountTypeId, balance, createdAt) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("Balance", balance);
      formData.append("CreatedAt", createdAt);

      const response = await axios.post(
        `/Account/add-account/${clientId}/${accountTypeId}/1`,
        formData
      );

      setSuccess(response.data?.message || "تم إنشاء الحساب بنجاح");
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "حدث خطأ أثناء إنشاء الحساب";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
const getAllAccounts = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("/Account/GetAllAccounts");
      return res.data.data; 
    } catch (err) {
      const message =
        err.response?.data?.message || "خطأ أثناء تحميل الحسابات";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const getAccountById = async (clientAccountId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`/Account/GetAccountByClientAccountId/${clientAccountId}`);
      return res.data.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "تعذّر تحميل تفاصيل الحساب";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
const updateAccount = async (clientId, newAccountTypeId, balance, createdAt) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      if (balance !== undefined) formData.append("Balance", balance);
      if (createdAt) formData.append("CreatedAt", createdAt);

      const res = await axios.put(
        `/Account/UpdateAccount/${clientId}/${newAccountTypeId}`,
        formData
      );

      setSuccess(res.data?.message || "تم تعديل الحساب بنجاح");
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "خطأ أثناء تعديل الحساب";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addAccount,
    getAllAccounts,
    getAccountById,
   updateAccount,
    loading,
    error,
    success,
  };
};
