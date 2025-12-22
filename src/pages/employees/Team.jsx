import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

import Header from "../../components/Header.jsx";
import { rows } from "./Data"; 
import { useNavigate } from "react-router-dom";

export default function Team() {
  const theme = useTheme();
  const navigate=useNavigate();
  
  const roles = ["Admin", "Manager", "User"];
  const governments = ["وزارة الصحة", "وزارة العمل", "الداخلية", "العدل"];

  const columns = [
    { field: "id", headerName: "ID", flex: 0.4, align: "center", headerAlign: "center" },
    { field: "name", headerName: "Name", flex: 1, align: "center", headerAlign: "center" },
    { field: "email", headerName: "Email", flex: 1, align: "center", headerAlign: "center" },
    { field: "phone", headerName: "Phone", flex: 1, align: "center", headerAlign: "center" },
    { field: "age", headerName: "Age", flex: 0.5, align: "center", headerAlign: "center" },

   
    {
      field: "access",
      headerName: "Role",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { access } }) => {
        const bg =
          access === "Admin"
            ? theme.palette.primary.dark
            : access === "Manager"
            ? theme.palette.secondary.dark
            : "#3da58a";

        return (
          <Box
            sx={{
              mx: "auto",
              my:"10px",
           
              px: 1,
              py: 0.5,
              display: "flex",
              gap: "5px",
              borderRadius: "4px",
              alignItems: "center",
              justifyContent: "center",
              textAlign:'center',
               align: "center",
              bgcolor: bg,
              width: "110px",
            }}
          >
            {access === "Admin" && <AdminPanelSettingsOutlinedIcon sx={{ color: "#fff", fontSize: 16 }} />}
            {access === "Manager" && <SecurityOutlinedIcon sx={{ color: "#fff", fontSize: 16 }} />}
            {access === "User" && <LockOpenOutlinedIcon sx={{ color: "#fff", fontSize: 16 }} />}
            <Typography sx={{ color: "#fff", fontSize: "13px" }}>{access}</Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "98%", mx: "auto", mt: 2 }}>
      <Header title="All Employees" subTitle="Manage government employees" />

      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        
        <TextField label="Search employee..." variant="outlined" size="small" sx={{ width: "250px" }} />

       
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField select label="Filter by Role" size="small" sx={{ width: "180px" }}>
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>

          <TextField select label="Government Entity" size="small" sx={{ width: "200px" }}>
            {governments.map((gov) => (
              <MenuItem key={gov} value={gov}>
                {gov}
              </MenuItem>
            ))}
          </TextField>

         
          <Button variant="contained"
           onClick={() => navigate("/employees/add")}
          startIcon={<AddIcon />}>
            Add Employee
          </Button>
        </Box>
      </Box>

     
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ height: 420 }}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
      />
    </Box>
  );
}
