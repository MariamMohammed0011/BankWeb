import { useState } from "react";
import { useAxios } from "../hooks/useAxios";

export const useClientService = () => {
  const axios = useAxios();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  /* =========================
     ADD CLIENT
  ========================= */
  // const addClient = async (formData) => {
  //   setLoading(true);
  //   setError(null);
  //   setSuccess(false);

  //   try {
  //     const fd = new FormData();
  //     Object.keys(formData).forEach((key) => {
  //       fd.append(key, formData[key]);
  //     });

  //     await axios.post("/Client/add", fd, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     setSuccess(true);
  //     return true;
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Error adding client");
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const addClient = async (formData) => {
  setLoading(true);
  setError(null);
  setSuccess(false);

  try {
    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      fd.append(key, formData[key]);
    });

    const res = await axios.post("/Client/add", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setSuccess(true);
    return res.data.client; // <-- الآن يرجع الـ client الجديد
  } catch (err) {
    setError(err.response?.data?.message || "Error adding client");
    throw err;
  } finally {
    setLoading(false);
  }
};

  /* =========================
     GET CLIENT BY ID
  ========================= */
  const getClientById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`/Client/${id}`);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error loading client");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     GET ALL CLIENTS
  ========================= */
  const getClients = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("/Client/all");
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error loading clients");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UPDATE CLIENT
  ========================= */
  const updateClient = async (id, body) => {
    setLoading(true);
    setError(null);

    try {
      const fd = new FormData();
      Object.keys(body).forEach((key) => fd.append(key, body[key]));

      const res = await axios.put(`/Client/edit/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error updating client");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addClient,
    getClientById,
    getClients,
    updateClient,
    loading,
    error,
    success,
  };
};
