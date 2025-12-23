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
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Header from "../../components/Header.jsx";
import { useSubAccountService } from "../../services/SubAccountService.js";
import { useAccountStateService } from "../../services/StateService.js";
import { useNavigate } from "react-router-dom";

export default function SubAccountList() {
  const navigate = useNavigate();
  const { getSubAccounts, deleteSubAccount, getSubAccountsHierarchy, loading } =
    useSubAccountService();

  const { changeState, loading: stateLoading } = useAccountStateService();

  const [subAccounts, setSubAccounts] = useState([]);
  const [expandedHierarchy, setExpandedHierarchy] = useState({});
  const [activeBtn, setActiveBtn] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getSubAccounts();
    setSubAccounts(data.map((item) => ({ ...item, nextState: "" })));
  };

  const handleDelete = async (id) => {
    await deleteSubAccount(id);
    loadData();
  };

  const handleHierarchy = async (subAccountId) => {
    try {
      if (expandedHierarchy[subAccountId]) {
        setExpandedHierarchy((prev) => ({ ...prev, [subAccountId]: null }));
      } else {
        const data = await getSubAccountsHierarchy(subAccountId);
        setExpandedHierarchy((prev) => ({ ...prev, [subAccountId]: data }));
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

      <Paper
        sx={{
          p: 4,
          borderRadius: "18px",
          boxShadow: "0 5px 25px rgba(0,0,0,0.10)",
        }}
      >
        {loading && (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <CircularProgress size={40} />
          </Box>
        )}

        <Grid container spacing={3}>
          {subAccounts.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.subAccountId}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  height: "100%",
                  transition: "0.25s ease",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
                  },
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6" fontWeight={600}>
                      حساب فرعي #{item.subAccountId}
                    </Typography>

                    {item.statusName && (
                      <Chip
                        label={item.statusName}
                        color={
                          item.statusName === "نشط"
                            ? "success"
                            : item.statusName === "مجمد"
                            ? "warning"
                            : "default"
                        }
                        size="small"
                      />
                    )}
                  </Stack>

                  {item.accountType?.typeName && (
                    <Chip
                      label={item.accountType.typeName}
                      color="primary"
                      variant="outlined"
                      sx={{ width: "fit-content" }}
                    />
                  )}

                  <Divider />

                  <Stack spacing={0.5}>
                    <Typography>
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
                  </Stack>

                  <Divider />

                  <Stack direction="row" spacing={2} alignItems="center">
                    <FormControl fullWidth size="small">
                      <Select
                        value={item.nextState}
                        displayEmpty
                        onChange={(e) => {
                          const value = e.target.value;
                          setSubAccounts((prev) =>
                            prev.map((p) =>
                              p.id === item.id ? { ...p, nextState: value } : p
                            )
                          );
                        }}
                      >
                        <MenuItem value="">اختر الحالة</MenuItem>
                        <MenuItem value="activate">تفعيل</MenuItem>
                        <MenuItem value="freeze">تجميد</MenuItem>
                        <MenuItem value="suspend">تعليق</MenuItem>
                        <MenuItem value="close">إغلاق</MenuItem>
                      </Select>
                    </FormControl>

                    <Button
                      variant="contained"
                      disabled={stateLoading}
                      onClick={async () => {
                        if (!item.nextState)
                          return alert("يجب اختيار حالة أولاً!");
                        setActiveBtn(item.subAccountId);

                        await changeState(
                          "sub",
                          item.subAccountId,
                          item.nextState
                        );
                        loadData();
                      }}
                    >
                      {stateLoading && activeBtn === item.subAccountId ? (
                        <CircularProgress size={20} />
                      ) : (
                        "تطبيق"
                      )}
                    </Button>
                  </Stack>

                  <Divider />

                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="تعديل">
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="حذف">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item.subAccountId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="عرض الهيكلية">
                      <IconButton
                        color="secondary"
                        onClick={() => navigate("/accounts/hierarchy")}
                      >
                        <AccountTreeIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
