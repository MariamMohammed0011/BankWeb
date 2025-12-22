import { useState } from "react";
import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import Header from "../../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { useAccountTypeService } from "../../services/AccountService.js";

export default function AddAccountType() {
  const navigate = useNavigate();
  const { addAccountType, loading, error, success } = useAccountTypeService();

  const [formData, setFormData] = useState({
    typeName: "",
    annualInterestRate: "",
    dailyWithdrawalLimit: "",
    monthlyFee: "",
    termsAndConditions: "",
  });
const isPositiveNumber = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

  const [errors, setErrors] = useState({});
const validate = () => {
  const newErrors = {};

  // Type Name: Arabic & English letters only
  if (!formData.typeName.trim()) {
    newErrors.typeName = "اسم الحساب مطلوب";
  } else if (!/^[\u0600-\u06FFa-zA-Z ]+$/.test(formData.typeName)) {
    newErrors.typeName = "اسم الحساب يجب أن يحتوي على أحرف عربية أو إنجليزية فقط";
  }

  // Annual Interest Rate
  if (formData.annualInterestRate === "") {
    newErrors.annualInterestRate = "الفائدة السنوية مطلوبة";
  } else if (Number(formData.annualInterestRate) <= 0) {
    newErrors.annualInterestRate = "يجب أن تكون قيمة موجبة";
  }

  // Daily Withdrawal Limit
  if (formData.dailyWithdrawalLimit === "") {
    newErrors.dailyWithdrawalLimit = "معدل السحب اليومي مطلوب";
  } else if (Number(formData.dailyWithdrawalLimit) <= 0) {
    newErrors.dailyWithdrawalLimit = "يجب أن تكون قيمة موجبة";
  }

  /// Monthly Fee
if (formData.monthlyFee === "") {
  newErrors.monthlyFee = "الرسوم الشهرية مطلوبة";
} else if (!isPositiveNumber(formData.monthlyFee)) {
  newErrors.monthlyFee = "يجب أن تكون قيمة موجبة";
}


  // Terms and Conditions (10 - 500 chars)
  if (!formData.termsAndConditions.trim()) {
    newErrors.termsAndConditions = "الشروط والأحكام مطلوبة";
  } else if (
    formData.termsAndConditions.length < 10 ||
    formData.termsAndConditions.length > 500
  ) {
    newErrors.termsAndConditions =
      "الشروط والأحكام يجب أن تكون بين 10 و 500 محرف";
  }

  return newErrors;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await addAccountType(formData);
      setTimeout(() => navigate("/account-types"), 1000);
    } catch {
        console.log(3);
    }
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
      <Header title="Add Account Type" subTitle="Add a new bank account type" />
      <Paper sx={{ p: 4 }} elevation={3}>
        {success && <p style={{ color: "green" }}>Account type added successfully</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Type Name"
              value={formData.typeName}
              onChange={(e) => setFormData({ ...formData, typeName: e.target.value })}
              error={!!errors.typeName}
              helperText={errors.typeName}
            />
            <TextField
              label="Annual Interest Rate"
              type="number"
              value={formData.annualInterestRate}
              onChange={(e) => setFormData({ ...formData, annualInterestRate: e.target.value })}
              error={!!errors.annualInterestRate}
              helperText={errors.annualInterestRate}
            />
            <TextField
              label="Daily Withdrawal Limit"
              type="number"
              value={formData.dailyWithdrawalLimit}
              onChange={(e) => setFormData({ ...formData, dailyWithdrawalLimit: e.target.value })}
              error={!!errors.dailyWithdrawalLimit}
              helperText={errors.dailyWithdrawalLimit}
            />
            <TextField
              label="Monthly Fee"
              type="number"
              value={formData.monthlyFee}
              onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
              error={!!errors.monthlyFee}
              helperText={errors.monthlyFee}
            />
            <TextField
              label="Terms and Conditions"
              value={formData.termsAndConditions}
              onChange={(e) => setFormData({ ...formData, termsAndConditions: e.target.value })}
              error={!!errors.termsAndConditions}
              helperText={errors.termsAndConditions}
              multiline
              rows={4}
            />

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" onClick={() => navigate("/account-types")}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? "Saving..." : "Save Account Type"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
