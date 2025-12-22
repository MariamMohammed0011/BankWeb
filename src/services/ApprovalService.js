import { useState } from "react";
import { useAxios } from "../hooks/useAxios";

export const useApprovalService = () => {
  const axios = useAxios();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState([]);

  const getPendingApprovals = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("/approvals/pending");
      setPending(res.data);
    } catch (err) {
      setError(err.response?.data || "Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (approvalId) => {
    try {
      await axios.post(`/approvals/${approvalId}/approve`);
    } catch (err) {
      throw err;
    }
  };

  const reject = async (approvalId) => {
    try {
      await axios.post(`/approvals/${approvalId}/reject`);
    } catch (err) {
      throw err;
    }
  };

  return {
    loading,
    error,
    pending,
    getPendingApprovals,
    approve,
    reject
  };
};
