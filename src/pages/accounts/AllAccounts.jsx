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
} from "@mui/material";

import { useAccountService } from "../../services/AccountClientService";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function AllAccounts() {
  const { getAllAccounts } = useAccountService();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

      <Paper sx={{ p: 2 }}>
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
                    sx={{ ml: 1 }}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
