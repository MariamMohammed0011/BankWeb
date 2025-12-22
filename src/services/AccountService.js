import { useState } from "react";
import { useAxios } from "../hooks/useAxios";

export const useAccountTypeService = () => {
  const axios = useAxios();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  /* =========================
     ADD ACCOUNT TYPE
  ========================= */
  const addAccountType = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const body = new FormData();
      body.append("typeName", formData.typeName);
      body.append("AnnualInterestRate", formData.annualInterestRate);
      body.append("dailyWithdrawalLimit", formData.dailyWithdrawalLimit);
      body.append("monthlyFee", formData.monthlyFee);
      body.append("termsAndConditions", formData.termsAndConditions);

      await axios.post("/AccountType/add", body);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Error adding account type");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     GET ACCOUNT TYPE BY ID
  ========================= */
  const getAccountTypeById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`AccountType/${id}`);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error loading account type");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     (OPTIONAL) GET ALL TYPES
  ========================= */
  const getAccountTypes = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("/AccountType/all");
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error loading account types");
      throw err;
    } finally {
      setLoading(false);
    }
  };
const updateAccountType = async (id, body) => {
    const formData = new FormData();

    formData.append("typeName", body.typeName);
    formData.append("annualInterestRate", body.annualInterestRate);
    formData.append("dailyWithdrawalLimit", body.dailyWithdrawalLimit);
    formData.append("monthlyFee", body.monthlyFee);
    formData.append("termsAndConditions", body.termsAndConditions);

    const res = await axios.put(`AccountType/edit/${id}`, formData);
    return res.data;
  };

  return {
    addAccountType,
    getAccountTypeById,
    getAccountTypes,
    loading,
    error,
    success,
    updateAccountType
  };
};
