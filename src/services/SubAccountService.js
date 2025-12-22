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
    console.log("📦 RAW DATA FROM FORM:");
Object.entries(data).forEach(([key, value]) => {
  console.log(
    `${key}:`,
    value,
    `| type:`,
    value === null ? "null" : typeof value
  );
});
const formData = new FormData();

formData.append("ParentAccountId", Number(data.ParentAccountId));
formData.append("StatusId", Number(statusId));
formData.append("SubAccountTypeId", Number(subAccountTypeId));

formData.append("DailyWithdrawalLimit", Number(data.DailyWithdrawalLimit) || 0);
formData.append("TransferLimit", Number(data.TransferLimit) || 0);
formData.append("Balance", Number(data.Balance) || 0);
formData.append("UsageAreas", data.UsageAreas || "");
formData.append("UserPermissions", data.UserPermissions || "");

if (data.CreatedAt) {
  formData.append(
    "CreatedAt",
    new Date(data.CreatedAt).toISOString()
  );
}

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

// ➤ Get All Sub Accounts
const getSubAccounts = async () => {
  setLoading(true);
  setError(null);

  try {
    const res = await axios.get("/SubAccount/Get_All_Sub_Accounts");
    return res.data.data; // حسب الجسون اللي عرضتيه
  } catch (err) {
    setError("خطأ أثناء جلب الحسابات الفرعية");
    throw err;
  } finally {
    setLoading(false);
  }
};
const getSubAccountsHierarchy = async (subAccountId) => {
  setLoading(true);
  setError(null);

  try {
    const res = await axios.get(`/SubAccount/${subAccountId}/hierarchy`);
    return res.data.subAccounts || [];
  } catch (err) {
    console.error("RESPONSE ERROR:", err.response?.data);
    setError("خطأ أثناء جلب الهيكلية");
    return []; // ← هكذا نتجنب تحطم الـ Component
  } finally {
    setLoading(false);
  }
};


  return {
    addSubAccount,
    getSubAccounts,
    getSubAccountsHierarchy, // <- أضفنا الدالة هنا
    loading,
    error,
    success,
  };
};