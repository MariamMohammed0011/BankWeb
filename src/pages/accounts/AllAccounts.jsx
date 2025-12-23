import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";

import { useAccountService } from "../../services/AccountClientService";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useAccountStateService } from "../../services/StateService";
export default function AllAccounts() {
  const { getAllAccounts } = useAccountService();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    changeState,
    loading: stateLoading,
    error,
    success,
  } = useAccountStateService();
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState(null);
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllAccounts();
        setAccounts(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
      <Header title="جميع الحسابات البنكية" />

      <Paper sx={{ p: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>اسم العميل</TableCell>
              <TableCell>نوع الحساب</TableCell>
              <TableCell>الرصيد</TableCell>
              <TableCell>تاريخ الإنشاء</TableCell>
              <TableCell>خيارات</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {accounts.map((acc, clientAccountId) => (
              <TableRow key={clientAccountId}>
                <TableCell>{acc.clientFullName}</TableCell>
                <TableCell>{acc.accountTypeName}</TableCell>
                <TableCell>{acc.balance}</TableCell>
                <TableCell>{acc.createdAt}</TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate(`/accounts/details`, { state: { account: acc } })
                    }
                  >
                    التفاصيل
                  </Button>

                  <Button
                    sx={{ mt: 1 }}
                    variant="contained"
                    onClick={() =>
                      navigate(`/accounts/edit/${acc.clientAccountId}`, {
                        state: { account: acc },
                      })
                    }
                  >
                    تعديل
                  </Button>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <select
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                      }}
                      value={acc.nextState || ""}
                      onChange={(e) => {
                        const newState = e.target.value;
                        setAccounts((prev) =>
                          prev.map((item) =>
                            item.clientAccountId === acc.clientAccountId
                              ? { ...item, nextState: newState }
                              : item
                          )
                        );
                      }}
                    >
                      <option value="">اختر الحالة</option>
                      <option value="activate">تفعيل</option>
                      <option value="freeze">تجميد</option>
                      <option value="suspend">تعليق</option>
                      <option value="close">إغلاق</option>
                    </select>

                    <Button
                      variant="contained"
                      disabled={stateLoading}
                      onClick={async () => {
                        setActiveBtn(acc.clientAccountId);

                        await changeState(
                          "client",
                          acc.clientAccountId,
                          acc.nextState
                        );
                      }}
                    >
                      {stateLoading && activeBtn === acc.clientAccountId ? (
                        <CircularProgress size={20} />
                      ) : (
                        "تطبيق"
                      )}
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
