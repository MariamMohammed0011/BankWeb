import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import ReusableAlert from "../employees/addEmployee/ReusableAlert";
import { useAccountService } from "../../services/AccountClientService";
import { useAccountTypeService } from "../../services/AccountService";

export default function EditAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const accountData = location.state?.account;

  const { updateAccount, loading, error, success } = useAccountService();
  const { getAccountTypes } = useAccountTypeService();

  const [accountTypes, setAccountTypes] = useState([]);
  const [formData, setFormData] = useState({
    clientId: accountData?.clientAccountId || "",
    accountTypeId: accountData?.accountTypeId || "",
    balance: accountData?.balance || "",
    createdAt: accountData?.createdAt || "",
  });

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const types = await getAccountTypes();
        setAccountTypes(types);
      } catch (err) {
        console.error(err);
      }
    };
    loadTypes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientId || !formData.accountTypeId) {
      alert("يرجى التأكد من اختيار نوع الحساب ووجود بيانات العميل");
      return;
    }
    try {
      await updateAccount(
        formData.clientId,
        formData.accountTypeId,
        formData.balance,
        formData.createdAt
      );
      
      navigate("/getAllAccount");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ width: "80%", mx: "auto", mt: 4 }}>
      <Header title="تعديل الحساب البنكي" />
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2 }}>
        {success && <ReusableAlert message={success} severity="success" />}
        {error && <ReusableAlert message={error} severity="error" />}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              select
              label="نوع الحساب"
              name="accountTypeId"
              value={formData.accountTypeId}
              onChange={handleChange}
            >
              {accountTypes.map((type) => (
                <MenuItem key={type.accountTypeId} value={type.accountTypeId}>
                  {type.typeName}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="الرصيد"
              name="balance"
              type="number"
              value={formData.balance}
              onChange={handleChange}
            />

            <TextField
              type="date"
              label="تاريخ الإنشاء"
              name="createdAt"
              InputLabelProps={{ shrink: true }}
              value={formData.createdAt}
              onChange={handleChange}
            />

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "تحديث الحساب"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
