import { useState } from "react";
import { useAxios } from "../hooks/useAxios";

export const useFeatureService = () => {
  const axios = useAxios();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  /* =========================
     ADD FEATURE
  ========================= */
  const addFeature = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("description", formData.description);
      body.append("Cost", formData.Cost);

      const res = await axios.post("/Feature/Add_Feature", body);

      setSuccess(true);
      // نفترض أن الـ API يرجع featureId
      return res.data; 
    } catch (err) {
      setError(err.response?.data?.message || "Error adding feature");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     ASSIGN FEATURE TO ACCOUNT TYPES
  ========================= */
  const assignFeatureToAccountTypes = async (featureId, accountTypeIds) => {
    setLoading(true);
    setError(null);

    try {
      for (const accountId of accountTypeIds) {
        await axios.post(`/Feature/assign-Feature-to-AccountType/${featureId}/${accountId}`);
      }
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Error assigning feature to account types");
      throw err;
    } finally {
      setLoading(false);
    }
  };
const getFeatures = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/Feature/Get_Features");
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching features");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const deleteFeature = async (featureId) => {
  setLoading(true);
  setError(null);

  try {
    await axios.delete(`/Feature/DeleteFeature/${featureId}`);
    return true;
  } catch (err) {
    setError(err.response?.data?.message || "Error deleting feature");
    throw err;
  } finally {
    setLoading(false);
  }
};
  return {
    addFeature,
    assignFeatureToAccountTypes,
    getFeatures,
    deleteFeature,
    loading,
    error,
    success,
  };
};
