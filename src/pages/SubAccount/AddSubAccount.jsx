import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Stack,
  MenuItem,
  Typography,
  CircularProgress,
  Divider,
  InputAdornment,
} from "@mui/material";
import { useAccountTypeService } from "../../services/AccountService";

import Header from "../../components/Header";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CategoryIcon from "@mui/icons-material/Category";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import NotesIcon from "@mui/icons-material/Notes";
import SecurityIcon from "@mui/icons-material/Security";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import { useSubAccountService } from "../../services/SubAccountService";
import { useAccountService } from "../../services/AccountClientService";

export default function AddSubAccount() {
  const { addSubAccount, loading, success, error } = useSubAccountService();
  const { getAllAccounts } = useAccountService();
  const [accountTypes, setAccountTypes] = useState([]);

const { getAccountTypes } = useAccountTypeService();

  const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState({
    ParentAccountId: "",
    statusId : 1,
    subAccountTypeId: "",
    DailyWithdrawalLimit: "",
    TransferLimit: "",
    UsageAreas: "",
    UserPermissions: "",
    Balance: "",
    CreatedAt: "",
  });

useEffect(() => {
  loadAccounts();
  loadAccountTypes();
}, []);

const loadAccountTypes = async () => {
  const data = await getAccountTypes();
  setAccountTypes(data);
};

  const loadAccounts = async () => {
    const data = await getAllAccounts();
    setAccounts(data);
  };
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]:
      name === "ParentAccountId" ||
      name === "subAccountTypeId" ||
      name === "statusId"
        ? Number(value)
        : value,
  });
};

  const handleBalanceChange = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === "") {
      setFormData({ ...formData, Balance: value });
    }
  };

  const handleSubmit = async () => {
    if (!formData.ParentAccountId || !formData.statusId || !formData.subAccountTypeId) {
      alert("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    await addSubAccount(
      formData.ParentAccountId,
      formData.statusId,
      formData.subAccountTypeId,
      formData
    );
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
      <Header title="إضافة حساب فرعي" subTitle="إنشاء حساب فرعي جديد" />

      <Paper
        sx={{
          p: 4,
          borderRadius: "18px",
          background: "#ffffff",
          boxShadow: "0 8px 25px rgba(0,0,0,0.10)",
        }}
      >
        <Stack spacing={4}>
          {/* 🔹 عنوان */}
          <Typography variant="h6" sx={{ color: "#2d3e50", fontWeight: "bold" }}>
            <CategoryIcon sx={{ mr: 1, color: "#0288d1" }} />
            بيانات الحساب الفرعي
          </Typography>

          {/* 🔹 اختر الحساب الرئيسي */}
          <TextField
            select
            label="الحساب الرئيسي"
            name="ParentAccountId"
            value={formData.ParentAccountId}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon />
                </InputAdornment>
              ),
            }}
          >
            {accounts?.map((acc) => (
              <MenuItem key={acc.clientAccountId} value={acc.clientAccountId}>
                {acc.accountName || `Account #${acc.clientAccountId}`}
              </MenuItem>
            ))}
          </TextField>

          {/* 🔹 حالة الحساب */}
          {/* <TextField
            select
            label="حالة الحساب"
            name="statusId"
            value={formData.statusId}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CheckCircleIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value={1}>نشط</MenuItem>
            <MenuItem value={2}>مجمّد</MenuItem>
            <MenuItem value={3}>مغلق</MenuItem>
          </TextField> */}

          {/* 🔹 نوع الحساب الفرعي */}
          <TextField
            select
            label="نوع الحساب الفرعي"
            name="subAccountTypeId"
            value={formData.subAccountTypeId}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon />
                </InputAdornment>
              ),
            }}
          >
            {accountTypes?.map((type) => (
  <MenuItem key={type.accountTypeId} value={type.accountTypeId}>
    {type.typeName}
  </MenuItem>
))}

          </TextField>

          <Divider />

          
          <Typography variant="h6" sx={{ color: "#2d3e50", fontWeight: "bold" }}>
            <SecurityIcon sx={{ mr: 1, color: "#ff9800" }} />
            حدود العمليات
          </Typography>

          <TextField
            label="حد السحب اليومي"
            name="DailyWithdrawalLimit"
            value={formData.DailyWithdrawalLimit}
            onChange={handleChange}
            type="number"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="حد التحويل"
            name="TransferLimit"
            value={formData.TransferLimit}
            onChange={handleChange}
            type="number"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SwapHorizIcon />
                </InputAdornment>
              ),
            }}
          />

          <Divider />

          
          <TextField
            label="أماكن الاستخدام"
            name="UsageAreas"
            value={formData.UsageAreas}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NotesIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="صلاحيات المستخدم"
            name="UserPermissions"
            value={formData.UserPermissions}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SecurityIcon />
                </InputAdornment>
              ),
            }}
          />

          
          <TextField
            label="الرصيد"
            name="Balance"
            value={formData.Balance}
            onChange={handleBalanceChange}
            type="number"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOnIcon />
                </InputAdornment>
              ),
            }}
          />

          
          <TextField
            label="تاريخ الإنشاء"
            type="date"
            name="CreatedAt"
            value={formData.CreatedAt}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          {/* رسائل */}
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="green">{success}</Typography>}
          {loading && <CircularProgress />}

          {/* زر الحفظ */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              py: 1.4,
              fontSize: "17px",
              borderRadius: "12px",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #0288d1, #26c6da)",
            }}
          >
            إنشاء الحساب
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
