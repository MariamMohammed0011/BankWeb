import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Chip,
} from "@mui/material";
import Header from "../../components/Header.jsx";
import { useAccountService } from "../../services/AccountClientService.js";
import { useSubAccountService } from "../../services/SubAccountService.js";

export default function AccountHierarchy() {
  const {
    getAllAccounts,
    loading: loadingAccounts,
    error: errorAccounts,
  } = useAccountService();
  const {
    getSubAccountsHierarchy,
    loading: loadingHierarchy,
    error: errorHierarchy,
  } = useSubAccountService();

  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [hierarchy, setHierarchy] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await getAllAccounts();
      setAccounts(data);
    } catch (err) {
      setError("خطأ في تحميل الحسابات الرئيسية");
    }
  };

  const handleShowHierarchy = async () => {
    if (!selectedAccountId) return;
    setError("");
    try {
      const data = await getSubAccountsHierarchy(selectedAccountId);
      setHierarchy(data || []);
    } catch (err) {
      setError("حدث خطأ أثناء جلب هيكلية الحسابات الفرعية");
      setHierarchy([]);
    }
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 4 }}>
      <Header
        title="عرض هيكلية الحسابات"
        subTitle="اختر حسابًا رئيسيًا لعرض الحسابات الفرعية"
      />

      <Paper
        sx={{
          p: 4,
          borderRadius: "16px",
          boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
        }}
      >
        {(loadingAccounts || loadingHierarchy) && (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <CircularProgress size={40} />
          </Box>
        )}

        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel>اختر الحساب الرئيسي</InputLabel>
            <Select
              value={selectedAccountId}
              label="اختر الحساب الرئيسي"
              onChange={(e) => setSelectedAccountId(e.target.value)}
            >
              {accounts.map((acc) => (
                <MenuItem key={acc.accountId} value={acc.accountId}>
                  {acc.accountName || `حساب #${acc.accountId}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleShowHierarchy}
            disabled={!selectedAccountId || loadingHierarchy}
          >
            عرض الهيكلية
          </Button>

          {(error || errorAccounts || errorHierarchy) && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error || errorAccounts || errorHierarchy}
            </Typography>
          )}

          {hierarchy.length > 0 && (
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {hierarchy.map((sub) => (
                <Grid item xs={12} md={6} lg={4} key={sub.subAccountId}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: "14px",
                      boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
                      transition: "0.25s",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="h6">
                        حساب فرعي #{sub.subAccountId}
                      </Typography>

                      {sub.statusName && (
                        <Chip
                          label={sub.statusName}
                          color={
                            sub.statusName === "نشط" ? "success" : "warning"
                          }
                          size="small"
                        />
                      )}

                      <Divider />

                      <Typography>
                        <b>الرصيد:</b> {sub.balance}
                      </Typography>
                      {sub.dailyWithdrawalLimit !== undefined && (
                        <Typography>
                          <b>حد السحب اليومي:</b> {sub.dailyWithdrawalLimit}
                        </Typography>
                      )}
                      {sub.transferLimit !== undefined && (
                        <Typography>
                          <b>حد التحويل:</b> {sub.transferLimit}
                        </Typography>
                      )}
                      {sub.usageAreas && (
                        <Typography>
                          <b>أماكن الاستخدام:</b> {sub.usageAreas}
                        </Typography>
                      )}
                      {sub.userPermissions && (
                        <Typography>
                          <b>صلاحيات المستخدم:</b> {sub.userPermissions}
                        </Typography>
                      )}
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {hierarchy.length === 0 && selectedAccountId && !error && (
            <Typography sx={{ mt: 1 }}>لا توجد حسابات فرعية.</Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
