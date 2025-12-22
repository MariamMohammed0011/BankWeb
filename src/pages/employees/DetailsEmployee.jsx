import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, Avatar, Stack, Divider } from "@mui/material";

export default function DetailsEmployee() {
  const { id } = useParams(); 

  const employee = {
    id,
    name: "Ahmad Ali",
    email: "ahmad.admin@gov.ps",
    phone: "0599123456",
    age: 32,
    role: "Admin",
    department: "IT Department",
    avatar: "/avatar.jpg",
    joinDate: "2023-01-14",
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Employee Details
      </Typography>

      <Card sx={{ p: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar src={employee.avatar} sx={{ width: 90, height: 90 }} />
            <Box>
              <Typography variant="h5">{employee.name}</Typography>
              <Typography color="text.secondary">{employee.role}</Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Typography><strong>ID:</strong> {employee.id}</Typography>
          <Typography><strong>Email:</strong> {employee.email}</Typography>
          <Typography><strong>Phone:</strong> {employee.phone}</Typography>
          <Typography><strong>Age:</strong> {employee.age}</Typography>
          <Typography><strong>Department:</strong> {employee.department}</Typography>
          <Typography><strong>Join Date:</strong> {employee.joinDate}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
