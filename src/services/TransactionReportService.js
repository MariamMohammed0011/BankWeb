import { useState } from "react";
import { useAxios } from "../hooks/useAxios";

export const useTransactionReportService = () => {
  const axios = useAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDailyReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/TransactionReport/daily");
      return res.data; 
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء جلب التقرير اليومي");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getDailyReport,
    loading,
    error,
  };
};
