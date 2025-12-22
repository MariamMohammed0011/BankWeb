import { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import Header from "../../components/Header";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useTransactionService } from "../../services/TransactionService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Deposit() {
  const { deposit } = useTransactionService();

  const [formData, setFormData] = useState({
    AccountNumber: "",
    Amount: "",
    Description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!formData.AccountNumber || isNaN(formData.AccountNumber)) {
      toast.error("الرجاء إدخال رقم حساب صالح");
      return;
    }

    const amount = parseFloat(formData.Amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("الرجاء إدخال مبلغ صحيح أكبر من 0");
      return;
    }

    const fd = new FormData();
    fd.append("AccountNumber", formData.AccountNumber);
    fd.append("Amount", amount);
    fd.append("Description", formData.Description || "");

    try {
      setLoading(true);
      const result = await deposit(fd);

      if (result?.success) {
        toast.success(result.success || "تم الإيداع بنجاح!");
        setFormData({ AccountNumber: "", Amount: "", Description: "" });
      } else if (result?.error) {
        toast.error(result.error || "حدث خطأ أثناء العملية");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء العملية");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 5 }}>
      <Header title="عملية إيداع" subTitle="إيداع مبلغ في حساب معين" />

      <Paper sx={{ p: 5, borderRadius: 4, boxShadow: 3, mt: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <TextField
              autoFocus
              label="رقم الحساب"
              name="AccountNumber"
              value={formData.AccountNumber}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBalanceIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="المبلغ"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
              type="number"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnIcon color="success" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="وصف العملية"
              name="Description"
              value={formData.Description || ""}
              onChange={handleChange}
              fullWidth
            />
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ px: 4 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "تنفيذ الإيداع"
                )}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
}
