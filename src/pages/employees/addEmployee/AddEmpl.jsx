import { useState } from "react";
import { Box, Button, MenuItem, Paper, Stack } from "@mui/material";
import Header from "../../../components/Header.jsx";
import { useNavigate } from "react-router-dom";

import { useAddEmployee } from "../../../services/EmployeeService.js";
import ReusableTextField from "./ReusableTextField";
import ReusableAlert from "./ReusableAlert";

export default function AddEmpl() {
  const navigate = useNavigate();
  const { addEmployee, loading, error, success } = useAddEmployee();
  const ID_REGEX = /^\d{12}$/;
  const PHONE_REGEX = /^09\d{8}$/;

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    role: "",
    firstName: "",
    middleName: "",
    lastName: "",
    identityNumber: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";

    if (!formData.username) newErrors.username = "Username is required";

    if (!formData.role) newErrors.role = "Role is required";

    if (!formData.firstName) newErrors.firstName = "First name is required";

    if (!formData.lastName) newErrors.lastName = "Last name is required";

    // ✅ Identity Number validation (12 digits)
    if (!formData.identityNumber) {
      newErrors.identityNumber = "Identity number is required";
    } else if (!/^\d{12}$/.test(formData.identityNumber)) {
      newErrors.identityNumber = "Identity number must be exactly 12 digits";
    }

    // ✅ Phone validation (09 + 8 digits)
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^09\d{8}$/.test(formData.phone)) {
      newErrors.phone = "رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(3);
    const validationErrors = validate();
    console.log(3);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
console.log(4);
    try {
       console.log(3);
      await addEmployee(formData);
      setTimeout(() => navigate("/"), 1000);
    } catch {
      console.log(3);
    }
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
      <Header title="Add New Employee" subTitle="Add Teller or Manager" />

      <Paper sx={{ p: 4 }} elevation={3}>
        {success && (
          <ReusableAlert
            message="Employee added successfully"
            severity="success"
          />
        )}
        {error && <ReusableAlert message={error} severity="error" />}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <ReusableTextField
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={!!errors.email}
              helperText={errors.email}
            />
 <ReusableTextField
              label="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              error={!!errors.username}
              helperText={errors.username}
            />

            <ReusableTextField
              label="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              error={!!errors.firstName}
              helperText={errors.firstName}
            />

            <ReusableTextField
              label="Middle Name"
              value={formData.middleName}
              onChange={(e) =>
                setFormData({ ...formData, middleName: e.target.value })
              }
            />

            <ReusableTextField
              label="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              error={!!errors.lastName}
              helperText={errors.lastName}
            />

            <ReusableTextField
              label="Identity Number"
              value={formData.identityNumber}
              onChange={(e) =>
                setFormData({ ...formData, identityNumber: e.target.value })
              }
              error={!!errors.identityNumber}
              helperText={errors.identityNumber}
              inputProps={{ maxLength: 12 }}
            />

            <ReusableTextField
              label="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              error={!!errors.phone}
              helperText={errors.phone}
              inputProps={{ maxLength: 10 }}
            />

            <ReusableTextField
              select
              label="Role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              error={!!errors.role}
              helperText={errors.role}
            >
              <MenuItem value="Teller">Teller</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </ReusableTextField>

            {/* باقي الحقول نفسها */}

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={loading} >
                {loading ? "Saving..." : "Save Employee"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
