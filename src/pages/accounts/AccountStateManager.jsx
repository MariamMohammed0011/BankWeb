import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
} from "@mui/material";
import Header from "../../components/Header";
import { useAccountStateService } from "../../services/StateService";
import { useAccountService } from "../../services/AccountClientService";
import { useSubAccountService } from "../../services/SubAccountService";

export default function AccountStateSelector() {
  const { changeClientState, changeSubAccountState, loading, error, success } =
    useAccountStateService();
  const { getAllAccounts } = useAccountService();
  const { getSubAccounts } = useSubAccountService();

  const [clients, setClients] = useState([]);
  const [subs, setSubs] = useState([]);

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [selectedAction, setSelectedAction] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const clientsData = await getAllAccounts();
    setClients(clientsData);
    if (clientsData.length > 0) setSelectedClient(clientsData[0].accountId);

    const subsData = await getSubAccounts();
    setSubs(subsData);
    if (subsData.length > 0) setSelectedSub(subsData[0].subAccountId);
  };

  const handleSubmit = async () => {
    if (!selectedAction) return alert("اختر نوع الحالة أولاً");

    if (selectedClient) {
      await changeClientState(selectedClient, selectedAction);
    }

    if (selectedSub) {
      await changeSubAccountState(selectedSub, selectedAction);
    }

    loadData();
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
      <Header title="تغيير حالة الحساب" subTitle="رئيسي و فرعي" />

      <Paper sx={{ p: 4, borderRadius: "16px" }} elevation={3}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="green">{success}</Typography>}

        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel>اختر الحساب الرئيسي</InputLabel>
            <Select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              {clients.map((c) => (
                <MenuItem key={c.accountId} value={c.accountId}>
                  #{c.accountId} - {c.accountTypeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>اختر الحساب الفرعي</InputLabel>
            <Select
              value={selectedSub}
              onChange={(e) => setSelectedSub(e.target.value)}
            >
              {subs.map((s) => (
                <MenuItem key={s.subAccountId} value={s.subAccountId}>
                  #{s.subAccountId} - parent #{s.parentAccountId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>اختر نوع الحالة</InputLabel>
            <Select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
            >
              <MenuItem value="activate">تفعيل</MenuItem>
              <MenuItem value="freeze">تجميد</MenuItem>
              <MenuItem value="suspend">تعليق</MenuItem>
              <MenuItem value="close">إغلاق</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ py: 1.5 }}
          >
            تطبيق الحالة
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
