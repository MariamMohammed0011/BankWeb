import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Paper,
  CircularProgress,
  TextField,
} from "@mui/material";
import Header from "../../components/Header.jsx";
import { useNavigate } from "react-router-dom";

import { useClientService } from "../../services/ClientService";
import { validateClient } from "./validateClient";

import ReusableAlert from "../employees/addEmployee/ReusableAlert.jsx";
import UploadFileIcon from "@mui/icons-material/UploadFile"; // أيقونة رفع ملف
import { useClientFacade } from "../../facades/ClientFacade";

export default function AddClient() {
  const navigate = useNavigate();
  const { addClient, loading, error, success } = useClientService();
  const clientFacade = useClientFacade();

  const [formData, setFormData] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    IdentityNumber: "",
    IdentityImage: null,
    IncomeSource: "",
    MonthlyIncome: "",
    AccountPurpose: "",
    Phone: "",
    Username: "",
    Email:"",
    Password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateClient(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const result = await clientFacade.registerClientWithAccount(formData, 1);

      if (result.success) {
        const { client, account } = result;
        console.log("Client:", client);
        console.log("Account:", account);

        navigate("/addAccount", { state: { clientId: client.clientId } });
      } else {
        console.error("Facade Error:", result.error);
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
    }
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
      <Header title="إضافة عميل جديد" subTitle="أضف معلومات العميل بالكامل" />

      <Paper sx={{ p: 4 }} elevation={3}>
        {success && (
          <ReusableAlert message="تم إضافة العميل بنجاح ✔" severity="success" />
        )}
        {error && <ReusableAlert message={error} severity="error" />}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="الاسم الأول"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              error={!!errors.FirstName}
              helperText={errors.FirstName}
            />

            <TextField
              label="اسم الأب"
              name="MiddleName"
              value={formData.MiddleName}
              onChange={handleChange}
              error={!!errors.MiddleName}
              helperText={errors.MiddleName}
            />
            <TextField
              label="اسم العائلة"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              error={!!errors.LastName}
              helperText={errors.LastName}
            />
            <TextField
              label="رقم الهوية"
              name="IdentityNumber"
              value={formData.IdentityNumber}
              onChange={handleChange}
              error={!!errors.IdentityNumber}
              helperText={errors.IdentityNumber}
              inputProps={{ maxLength: 12 }}
            />

            <Box
              sx={{
                border: "1px dashed #1976d2",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: formData.IdentityImage ? "#e3f2fd" : "transparent",
              }}
              onClick={() => document.getElementById("identity-upload").click()}
            >
              <UploadFileIcon sx={{ mr: 1 }} />
              {formData.IdentityImage
                ? formData.IdentityImage.name
                : "رفع صورة الهوية"}
              <input
                id="identity-upload"
                type="file"
                hidden
                name="IdentityImage"
                onChange={handleChange}
              />
            </Box>
            {errors.IdentityImage && (
              <Typography color="error">{errors.IdentityImage}</Typography>
            )}

            <TextField
              label="مصدر الدخل"
              name="IncomeSource"
              value={formData.IncomeSource}
              onChange={handleChange}
              error={!!errors.IncomeSource}
              helperText={errors.IncomeSource}
            />

            <TextField
              label="الدخل الشهري"
              name="MonthlyIncome"
              value={formData.MonthlyIncome}
              onChange={handleChange}
              error={!!errors.MonthlyIncome}
              helperText={errors.MonthlyIncome}
            />

            <TextField
              label="غرض الحساب"
              name="AccountPurpose"
              value={formData.AccountPurpose}
              onChange={handleChange}
              error={!!errors.AccountPurpose}
              helperText={errors.AccountPurpose}
            />

            <TextField
              label="رقم الهاتف"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              error={!!errors.Phone}
              helperText={errors.Phone}
            />

            <TextField
              label="اسم المستخدم"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              error={!!errors.Username}
              helperText={errors.Username}
            />
             <TextField
              label=" البريد الالكتروني"
              name="Email"
              type="email"
              value={formData.Email}
              onChange={handleChange}
              error={!!errors.Email}
              helperText={errors.Email}
            />
        
            <TextField
              label="كلمة المرور"
              name="Password"
              type="password"
              value={formData.Password}
              onChange={handleChange}
              error={!!errors.Password}
              helperText={errors.Password}
            />

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" onClick={() => navigate("/")}>
                إلغاء
              </Button>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "إضافة العميل"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
