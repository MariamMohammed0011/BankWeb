import { useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Alert,
  Button,
  Stack
} from "@mui/material";

import { useApprovalService } from "../../src/services/ApprovalService";
import Header from "../../src/components/Header";

const PendingApprovals = () => {
  const { loading, error, pending, getPendingApprovals, approve, reject } =
    useApprovalService();

  useEffect(() => {
    getPendingApprovals();
  }, []);

  const getTypeName = (typeId) => {
    switch (typeId) {
      case 1: return "إيداع";
      case 2: return "سحب";
      case 3: return "تحويل";
      default: return "غير معروف";
    }
  };

  const handleApprove = async (id) => {
    try {
      await approve(id);
      getPendingApprovals(); // refresh list
    } catch {
      alert("خطأ أثناء الموافقة");
    }
  };

  const handleReject = async (id) => {
    try {
      await reject(id);
      getPendingApprovals(); // refresh list
    } catch {
      alert("خطأ أثناء الرفض");
    }
  };

  return (
    <Box p={4}>
      <Header title="الطلبات المعلّقة" />

      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" mb={2}>
          جميع الطلبات التي تحتاج موافقة المدير
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && pending.length === 0 && (
          <Typography>لا توجد طلبات معلّقة</Typography>
        )}

        {!loading && pending.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>موافقة #</TableCell>
                <TableCell>عملية #</TableCell>
                <TableCell>النوع</TableCell>
                <TableCell>المبلغ</TableCell>
                <TableCell>من حساب</TableCell>
                <TableCell>إلى حساب</TableCell>
                <TableCell>التاريخ</TableCell>
                <TableCell>الإجراءات</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {pending.map((item) => (
                <TableRow key={item.approvalId}>
                  <TableCell>{item.approvalId}</TableCell>
                  <TableCell>{item.transactionId}</TableCell>
                  <TableCell>{getTypeName(item.transactionTypeId)}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.senderAccountId}</TableCell>
                  <TableCell>{item.receiverAccountId ?? "-"}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(item.approvalId)}
                      >
                        قبول
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleReject(item.approvalId)}
                      >
                        رفض
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
};

export default PendingApprovals;
