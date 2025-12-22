import { Box, Paper, Typography, Stack, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { useLocation, useNavigate } from "react-router-dom";
import { keyframes, padding } from "@mui/system";

// Animation للدخول
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function AccountDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const account = location.state?.account;

  if (!account) return <h2>لا يوجد بيانات</h2>;

  return (
    <Box
      sx={{
        width: "75%",
        mx: "auto",
        mt: 4,
        direction: "rtl", // ضبط اتجاه عربي بالكامل
        textAlign: "right",
      }}
    >
      {/* زر رجوع احترافي */}
      <Stack direction="row" alignItems="center" mb={3}>
        <Button
  variant="outlined"
  startIcon={<ArrowBackIosNewIcon sx={{ ml: 1.5 }} />} // mr = marginRight
  onClick={() => navigate("/getAllAccount")}
  sx={{
    borderRadius: "30px",
    px: 2,
    py: 2,
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "bold",
    borderWidth: "2px",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#e8f0fe",
      borderColor: "#1976d2",
    },
  }}
>
  رجوع لصفحة الحسابات
</Button>

      </Stack>

      {/* الكارد */}
      <Paper
        sx={{
          p: 4,
          borderRadius: "20px",
          background: "linear-gradient(to bottom right, #ffffff, #f9fbfc)",
          border: "1px solid #e0e0e0",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          animation: `${fadeInUp} 0.6s ease`,
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
          },
        }}
      >
        {/* العنوان */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={4}
          mb={5}
          ml={2}
          sx={{ justifyContent: "flex-start" }}
        >
          <ManageAccountsOutlinedIcon
            style={{ fontSize: 32, color: "#1976d2", marginLeft: "5px" }}
          />
          <Typography variant="h5" fontWeight="bold" style={{color: "#1976d2"}}>
            تفاصيل الحساب البنكي
          </Typography>
        </Stack>

        {/* المحتوى */}
        <Box sx={{ mt: 5, lineHeight: 5 }} >
          <Typography variant="body1" fontSize="18px" mb={2}>
            <strong>اسم العميل:</strong> {account.clientFullName}
          </Typography>

          <Typography variant="body1" fontSize="18px" mb={2}>
            <strong>نوع الحساب:</strong> {account.accountTypeName}
          </Typography>

          <Typography variant="body1" fontSize="18px" mb={2}>
            <strong>الرصيد:</strong> {account.balance.toLocaleString()} ل.س
          </Typography>

          <Typography variant="body1" fontSize="18px" mb={2}>
            <strong>تاريخ الإنشاء:</strong> {account.createdAt}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
