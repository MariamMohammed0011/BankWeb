import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useAccountTypeService } from "../../services/AccountService";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/animatios/load.json";

export default function AccountTypeList() {
  const { getAccountTypes } = useAccountTypeService();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAccountTypes();
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={10} ml={15}>
        <Lottie
          animationData={loadingAnimation}
          style={{ width: 180, height: 180 }}
        />
      </Box>
    );
  }
  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
      <Header title="أنواع الحسابات" subTitle="إدارة أنواع الحسابات البنكية" />

      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={4} key={item.accountTypeId}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 2,
                bgcolor: "#f9f9f9",
                transition: "all 0.3s",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {item.typeName}
              </Typography>

              <Box sx={{ my: 1 }}>
                <Typography variant="body2">الفائدة السنوية</Typography>
                <LinearProgress
                  variant="determinate"
                  value={item.annualInterestRate}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": { bgcolor: "#1976d2" },
                  }}
                />
              </Box>

              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                onClick={() => navigate(`/account-types/${item.accountTypeId}`)}
              >
                عرض التفاصيل
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
