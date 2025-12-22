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
  Grid,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Header from "../../components/Header.jsx";
import { useSubAccountService } from "../../services/SubAccountService.js";

export default function SubAccountList() {
  const { getSubAccounts, deleteSubAccount, getSubAccountsHierarchy, loading } = useSubAccountService();
  const [subAccounts, setSubAccounts] = useState([]);
  const [expandedHierarchy, setExpandedHierarchy] = useState({}); // لتخزين البيانات الموسعة لكل حساب فرعي

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

  const handleHierarchy = async (subAccountId) => {
  try {
    if (expandedHierarchy[subAccountId]) {
      setExpandedHierarchy(prev => ({ ...prev, [subAccountId]: null }));
    } else {
      const data = await getSubAccountsHierarchy(subAccountId);
      setExpandedHierarchy(prev => ({ ...prev, [subAccountId]: data }));
    }
  } catch (err) {
    console.error("خطأ عند جلب الهيكلية:", err);
    alert("حدث خطأ في جلب الهيكلية، يرجى المحاولة لاحقًا.");
  }
};



  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 4 }}>
      <Header
        title="إدارة الحسابات الفرعية"
        subTitle="عرض وإدارة الحسابات الفرعية"
      />

      <Paper sx={{ p: 4, borderRadius: "16px", boxShadow: "0 4px 25px rgba(0,0,0,0.08)" }}>
        {loading && (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <CircularProgress size={40} />
          </Box>
        )}

        <Grid container spacing={3}>
          {subAccounts.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "14px",
                  transition: "0.25s",
                  height: "100%",
                  boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Stack spacing={2}>
                  {/* عنوان البطاقة والحالة */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight={600}>
                      حساب فرعي #{item.id}
                    </Typography>

                    {item.status?.stateName && (
                      <Chip
                        label={item.status.stateName}
                        color={
                          item.status.stateName === "نشط"
                            ? "success"
                            : item.status.stateName === "مجمد"
                            ? "warning"
                            : "default"
                        }
                        size="small"
                      />
                    )}
                  </Stack>

                  {/* نوع الحساب إذا موجود */}
                  {item.accountType?.typeName && (
                    <Chip
                      label={item.accountType.typeName}
                      color="primary"
                      variant="outlined"
                      sx={{ alignSelf: "flex-start" }}
                    />
                  )}

                  <Divider />

                  {/* معلومات الحساب */}
                  <Stack spacing={0.5}>
                    {item.dailyWithdrawalLimit !== undefined && (
                      <Typography>
                        <b>حد السحب اليومي:</b> {item.dailyWithdrawalLimit}
                      </Typography>
                    )}
                    {item.transferLimit !== undefined && (
                      <Typography>
                        <b>حد التحويل:</b> {item.transferLimit}
                      </Typography>
                    )}
                    {item.usageAreas && (
                      <Typography>
                        <b>أماكن الاستخدام:</b> {item.usageAreas}
                      </Typography>
                    )}
                    {item.userPermissions && (
                      <Typography>
                        <b>صلاحيات المستخدم:</b> {item.userPermissions}
                      </Typography>
                    )}
                  </Stack>

                  {/* أزرار التعديل والحذف وزر الهيكلية */}
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="تعديل">
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="حذف">
                      <IconButton color="error" onClick={() => handleDelete(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
<Tooltip title="عرض الهيكلية">
  <IconButton color="secondary" onClick={() => handleHierarchy(item.subAccountId)}>
    <AccountTreeIcon />
  </IconButton>
</Tooltip>

                  </Stack>

                  {/* عرض الهيكلية الموسعة إذا موجودة */}
                  {expandedHierarchy[item.id] && (
                    <Box sx={{ mt: 2, pl: 2, borderLeft: "2px solid #ddd" }}>
                      {expandedHierarchy[item.id].map((sub) => (
                        <Typography key={sub.subAccountId}>
                          - حساب فرعي #{sub.subAccountId}, الرصيد: {sub.balance}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
