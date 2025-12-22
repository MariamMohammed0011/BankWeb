import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useAccountTypeService } from "../../services/AccountService";

export default function AccountTypeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAccountTypeById } = useAccountTypeService();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAccountTypeById(id);
        setData(res);
      } catch (err) {
        setError("فشل تحميل بيانات نوع الحساب");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress size={60} />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center" mt={5}>
        {error}
      </Typography>
    );

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
      <Header
        title="تفاصيل نوع الحساب"
        subTitle="عرض معلومات نوع الحساب البنكي"
      />

      <Paper sx={{ p: 4 }} elevation={3}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {data.typeName}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography color="text.secondary">الفائدة السنوية</Typography>
            <Typography fontWeight="bold">
              {data.annualInterestRate} %
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography color="text.secondary">حد السحب اليومي</Typography>
            <Typography fontWeight="bold">
              {data.dailyWithdrawalLimit}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography color="text.secondary">الرسوم الشهرية</Typography>
            <Typography fontWeight="bold">{data.monthlyFee}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Terms */}
        <Typography variant="h6" gutterBottom>
          الشروط والأحكام
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            p: 2,
            bgcolor: "#fafafa",
            borderRadius: 2,
          }}
        >
          <Typography>
            {data.termsAndConditions && data.termsAndConditions.trim() !== ""
              ? data.termsAndConditions
              : "لا توجد شروط مسجلة لهذا النوع."}
          </Typography>
        </Paper>

        {/* Buttons */}
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={() => navigate("/account-types")}>
            رجوع
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/AccountType/edit/${id}`)}
          >
            تعديل النوع
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
