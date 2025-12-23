import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import Header from "../../components/Header.jsx";
import { useTransactionReportService } from "../../services/TransactionReportService.js";

export default function DailyTransactionReport() {
  const { getDailyReport, loading, error } = useTransactionReportService();
  const [reportPdf, setReportPdf] = useState(null);

  const loadReport = async () => {
    try {
      const data = await getDailyReport(); 
      if (data) {
        setReportPdf(data);
      }
    } catch (err) {
      console.error("خطأ في جلب التقرير:", err);
    }
  };

  const handleOpenPdf = () => {
    if (!reportPdf) return;
    const blob = new Blob([reportPdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  useEffect(() => {
    loadReport();
  }, []);

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 4 }}>
      <Header
        title="تقرير المعاملات اليومية"
        subTitle="عرض جميع المعاملات اليومية بشكل منظم"
      />

      <Paper
        sx={{
          p: 4,
          borderRadius: "16px",
          boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
        }}
      >
        {loading && (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <CircularProgress size={40} />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        {!loading && reportPdf && (
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography>التقرير جاهز للعرض:</Typography>
            <Button variant="contained" onClick={handleOpenPdf}>
              عرض/تنزيل تقرير PDF
            </Button>
          </Stack>
        )}

        {!loading && !reportPdf && !error && (
          <Typography sx={{ mt: 1 }}>لا توجد معاملات اليوم.</Typography>
        )}
      </Paper>
    </Box>
  );
}
