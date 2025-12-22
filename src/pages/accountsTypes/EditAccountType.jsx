import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useAccountTypeService } from "../../services/AccountService";

export default function EditAccountType() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAccountTypeById, updateAccountType } = useAccountTypeService();

  const [formData, setFormData] = useState({
    typeName: "",
    annualInterestRate: "",
    dailyWithdrawalLimit: "",
    monthlyFee: "",
    termsAndConditions: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isPositiveNumber = (value) => /^[0-9]*\.?[0-9]+$/.test(value);

  useEffect(() => {
    const fetch = async () => {
      const data = await getAccountTypeById(id);
      setFormData({
        typeName: data.typeName || "",
        annualInterestRate: data.annualInterestRate || "",
        dailyWithdrawalLimit: data.dailyWithdrawalLimit || "",
        monthlyFee: data.monthlyFee || "",
        termsAndConditions: data.termsAndConditions || "",
      });
      setLoading(false);
    };
    fetch();
  }, [id]);

  const validate = () => {
    const newErrors = {};

    if (!formData.typeName.trim()) {
      newErrors.typeName = "اسم الحساب مطلوب";
    } else if (!/^[\u0600-\u06FFa-zA-Z ]+$/.test(formData.typeName)) {
      newErrors.typeName =
        "اسم الحساب يجب أن يحتوي على أحرف عربية أو إنجليزية فقط";
    }

    if (formData.annualInterestRate === "") {
      newErrors.annualInterestRate = "الفائدة السنوية مطلوبة";
    } else if (!isPositiveNumber(formData.annualInterestRate)) {
      newErrors.annualInterestRate = "يجب إدخال رقم موجب فقط";
    }

    if (formData.dailyWithdrawalLimit === "") {
      newErrors.dailyWithdrawalLimit = "حد السحب اليومي مطلوب";
    } else if (!isPositiveNumber(formData.dailyWithdrawalLimit)) {
      newErrors.dailyWithdrawalLimit = "يجب إدخال رقم موجب فقط";
    }

    if (formData.monthlyFee === "") {
      newErrors.monthlyFee = "الرسوم الشهرية مطلوبة";
    } else if (!isPositiveNumber(formData.monthlyFee)) {
      newErrors.monthlyFee = "يجب إدخال رقم موجب فقط";
    }

    if (!formData.termsAndConditions.trim()) {
      newErrors.termsAndConditions = "الشروط والأحكام مطلوبة";
    } else if (
      formData.termsAndConditions.length < 10 ||
      formData.termsAndConditions.length > 500
    ) {
      newErrors.termsAndConditions = "الشروط يجب أن تكون بين 10 و 500 محرف";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      ["annualInterestRate", "dailyWithdrawalLimit", "monthlyFee"].includes(
        name
      )
    ) {
      if (value !== "" && !/^[0-9]*\.?[0-9]*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    await updateAccountType(id, formData);
    setSaving(false);
    navigate(`/account-types/${id}`);
  };

  if (loading)
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress size={60} />
      </Box>
    );

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
      <Header
        title="تعديل نوع الحساب"
        subTitle="تعديل بيانات نوع الحساب البنكي"
      />

      <Paper sx={{ p: 4 }} elevation={3}>
        <TextField
          label="اسم الحساب"
          fullWidth
          name="typeName"
          value={formData.typeName}
          onChange={handleChange}
          error={!!errors.typeName}
          helperText={errors.typeName}
          sx={{ mb: 3 }}
        />

        {/* annualInterestRate */}
        <TextField
          label="الفائدة السنوية (%)"
          fullWidth
          name="annualInterestRate"
          value={formData.annualInterestRate}
          onChange={handleChange}
          error={!!errors.annualInterestRate}
          helperText={errors.annualInterestRate}
          sx={{ mb: 3 }}
        />

        <TextField
          label="حد السحب اليومي"
          fullWidth
          name="dailyWithdrawalLimit"
          value={formData.dailyWithdrawalLimit}
          onChange={handleChange}
          error={!!errors.dailyWithdrawalLimit}
          helperText={errors.dailyWithdrawalLimit}
          sx={{ mb: 3 }}
        />

        <TextField
          label="الرسوم الشهرية"
          fullWidth
          name="monthlyFee"
          value={formData.monthlyFee}
          onChange={handleChange}
          error={!!errors.monthlyFee}
          helperText={errors.monthlyFee}
          sx={{ mb: 3 }}
        />

        <TextField
          label="الشروط والأحكام"
          fullWidth
          multiline
          rows={4}
          name="termsAndConditions"
          value={formData.termsAndConditions}
          onChange={handleChange}
          error={!!errors.termsAndConditions}
          helperText={errors.termsAndConditions}
          sx={{ mb: 3 }}
        />

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={() => navigate("/account-types")}>
            إلغاء
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
