import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  CircularProgress,
  Chip,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../components/Header.jsx";
import { useSubAccountService } from "../../services/SubAccountService.js";

export default function SubAccountList() {
  const { getSubAccounts, deleteSubAccount, loading } = useSubAccountService();
  const [subAccounts, setSubAccounts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getSubAccounts();
    setSubAccounts(data);
  };

  const handleDelete = async (id) => {
    await deleteSubAccount(id);
    loadData();
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
      <Header
        title="إدارة الحسابات الفرعية"
        subTitle="عرض وإدارة الحسابات الفرعية"
      />

      <Paper sx={{ p: 4, borderRadius: "16px" }} elevation={3}>
        {loading && <CircularProgress />}

        <Stack spacing={3}>
          {subAccounts.map((item) => (
            <Paper
              key={item.id}
              sx={{
                p: 3,
                borderRadius: "12px",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    حساب فرعي #{item.id}
                  </Typography>

                  <Chip
                    label={item.accountType?.typeName || "نوع حساب غير معروف"}
                    color="primary"
                    sx={{ mt: 1 }}
                  />

                  <Typography sx={{ mt: 1 }}>
                    <b>حد السحب اليومي:</b> {item.dailyWithdrawalLimit}
                  </Typography>

                  <Typography>
                    <b>حد التحويل:</b> {item.transferLimit}
                  </Typography>

                  <Typography>
                    <b>أماكن الاستخدام:</b> {item.usageAreas}
                  </Typography>

                  <Typography>
                    <b>صلاحيات المستخدم:</b> {item.userPermissions}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <Tooltip title="تعديل">
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="حذف">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
