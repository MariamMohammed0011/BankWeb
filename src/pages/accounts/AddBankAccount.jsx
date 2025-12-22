
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  CircularProgress ,MenuItem 

} from "@mui/material";
import {useAccountService} from "../../services/AccountClientService";
import { useAccountTypeService } from "../../services/AccountService";
import { validateAccount } from "./validateAccount";
import Header from "../../components/Header";
import ReusableAlert from "../employees/addEmployee/ReusableAlert";
import { useLocation } from "react-router-dom";

export default function AddBankAccount() {
  const { addAccount, loading, error, success } = useAccountService();
const location = useLocation();
  const clientIdFromState = location.state?.clientId || "";

  const [formData, setFormData] = useState({
     clientId: clientIdFromState,
    accountTypeId: "",
    balance: "",
    createdAt: "",
  });

  const [errors, setErrors] = useState({});
const { getAccountTypes } = useAccountTypeService();
const [accountTypes, setAccountTypes] = useState([]);
useEffect(() => {
  const fetchAccounts = async () => {
    try {
      const types = await getAccountTypes();
      console.log("Account types:", types); 
      setAccountTypes(types || []); 
    } catch (err) {
      console.error(err);
    }
  };
  fetchAccounts();
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAccount(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await addAccount(
      formData.clientId,
      formData.accountTypeId,
      formData.balance,
      formData.createdAt
    );
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
      <Header title="إضافة حساب بنكي" />

      <Paper sx={{ p: 4 }}>
        {success && <ReusableAlert message={success} severity="success" />}
        {error && <ReusableAlert message={error} severity="error" />}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {/* <TextField
              label="رقم العميل"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              error={!!errors.clientId}
              helperText={errors.clientId}
            /> */}

          <TextField
  select
  label="نوع الحساب"
  name="accountTypeId"
  value={formData.accountTypeId}
  onChange={handleChange}
  error={!!errors.accountTypeId}
  helperText={errors.accountTypeId}
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
              value={formData.balance}
              onChange={handleChange}
              error={!!errors.balance}
              helperText={errors.balance}
            />

            <TextField
              type="date"
              label="تاريخ الإنشاء"
              name="createdAt"
              InputLabelProps={{ shrink: true }}
              value={formData.createdAt}
              onChange={handleChange}
              error={!!errors.createdAt}
              helperText={errors.createdAt}
            />

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "إنشاء الحساب"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
