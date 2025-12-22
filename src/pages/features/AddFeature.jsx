import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Modal,
  Typography,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import Header from "../../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { useFeatureService } from "../../services/FeatureService.js";
import { useAccountTypeService } from "../../services/AccountService.js";

export default function AddFeature() {
  const navigate = useNavigate();
  const { addFeature, assignFeatureToAccountTypes, loading, error, success } = useFeatureService();
  const { getAccountTypes } = useAccountTypeService();

  const [formData, setFormData] = useState({ name: "", description: "", Cost: "" });
  const [errors, setErrors] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const [accountTypes, setAccountTypes] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
const [featureId, setFeatureId] = useState(null);

  useEffect(() => {
    fetchAccountTypes();
  }, []);

  const fetchAccountTypes = async () => {
    try {
      const data = await getAccountTypes();
      setAccountTypes(data);
    } catch {}
  };

  const isPositiveNumber = (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.Cost.trim()) newErrors.Cost = "Cost is required";
    else if (!isPositiveNumber(formData.Cost)) newErrors.Cost = "Cost must be a positive number";
    return newErrors;
  };

  const toggleAccount = (id) => {
    setSelectedAccounts(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;

  try {
    const createdFeature = await addFeature(formData);
    const id = createdFeature.featureId; // تأكد أن الـ API يرجع featureId
    setFeatureId(id); 
    setModalOpen(true); // فتح الـ modal بعد الحفظ
  } catch (err) {
    console.log(err);
  }
};

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
      <Header title="Add Feature" subTitle="Add a new feature" />
      <Paper sx={{ p: 4 }} elevation={3}>
        {success && <p style={{ color: "green" }}>Feature added successfully</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={3}
            />
            <TextField
              label="Cost"
              type="number"
              value={formData.Cost}
              onChange={(e) => setFormData({ ...formData, Cost: e.target.value })}
              error={!!errors.Cost}
              helperText={errors.Cost}
            />

           

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" onClick={() => navigate("/features")}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? "Saving..." : "Save Feature"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>

      {/* Modal لاختيار أنواع الحساب */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 4
          }}
        >
          <Typography variant="h6" mb={2}>
            Select Account Types
          </Typography>
          <Stack spacing={1}>
            {accountTypes.map((type) => (
              <FormControlLabel
                key={type.accountTypeId}
                control={
                  <Checkbox
                    checked={selectedAccounts.includes(type.accountTypeId)}
                    onChange={() => toggleAccount(type.accountTypeId)}
                  />
                }
                label={type.typeName}
              />
            ))}
          </Stack>
          <Box mt={3} textAlign="right">
            <Button variant="contained" onClick={async () => {
  try {
    await assignFeatureToAccountTypes(featureId, selectedAccounts);
    setModalOpen(false);
    navigate("/features"); // بعد الربط العودة للقائمة
  } catch (err) {
    console.log(err);
  }
}}>
  Done
</Button>

          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}
