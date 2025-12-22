import { useState } from "react";
import { useAxios } from "../hooks/useAxios";

export const useSubAccountService = () => {
  const axios = useAxios();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // ➤ Add SubAccount
  const addSubAccount = async (accountId, statusId, subAccountTypeId, data) => {
  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    const formData = new FormData();
    formData.append("ParentAccountId", Number(data.ParentAccountId));

    formData.append("DailyWithdrawalLimit", Number(data.DailyWithdrawalLimit) || 0);
    formData.append("TransferLimit", Number(data.TransferLimit) || 0);
    formData.append("UsageAreas", data.UsageAreas || "");
    formData.append("UserPermissions", data.UserPermissions || "");
    formData.append("Balance", Number(data.Balance) || 0);
    formData.append("CreatedAt", data.CreatedAt ? new Date(data.CreatedAt).toISOString() : new Date().toISOString());
for (let [key, value] of formData.entries()) {
  console.log(key, value);
}

    const res = await axios.post(
      `/SubAccount/${accountId}/${statusId}/${subAccountTypeId}/Add_Sub_Account`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    setSuccess("تم إنشاء الحساب الفرعي بنجاح");
    return res.data;
  } catch (err) {
    console.log("RESPONSE ERROR:", err.response?.data);
    setError(err.response?.data?.message || "خطأ أثناء إنشاء الحساب الفرعي");
    throw err;
  } finally {
    setLoading(false);
  }
};


  return {
    addSubAccount,
    loading,
    error,
    success,
  };
};
