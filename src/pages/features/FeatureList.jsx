// src/pages/Feature/FeatureList.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import Header from "../../components/Header.jsx";
import { useFeatureService } from "../../services/FeatureService.js";
import { useAccountTypeService } from "../../services/AccountService.js";

export default function FeatureList() {
  const {
    getFeatures,
    deleteFeature,
    loading: loadingFeatures,
    error: errorFeatures,
  } = useFeatureService();
  const fetchAccountTypes = async () => {
    try {
      const data = await getAccountTypes();
      setAccountTypes(data);
    } catch (err) {
      console.log(err);
    }
  };

  const { getAccountTypes, loading: loadingAccounts } = useAccountTypeService();

  const [features, setFeatures] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [selectedAccountType, setSelectedAccountType] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [featureToDelete, setFeatureToDelete] = useState(null);

  useEffect(() => {
    fetchFeatures();
    fetchAccountTypes();
  }, []);

  const fetchFeatures = async () => {
    try {
      const data = await getFeatures();
      setFeatures(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFeature(featureToDelete.featureId);
      setOpenDeleteDialog(false);
      setFeatureToDelete(null);
      fetchFeatures();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredFeatures = selectedAccountType
    ? features.filter((f) =>
        f.accountTypeFeatures.some(
          (a) => a.accountTypeId === parseInt(selectedAccountType)
        )
      )
    : features;

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 3 }}>
      <Header title="Features" subTitle="List of all features" />

      {/* Filter */}
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel>Filter by Account Type</InputLabel>
        <Select
          value={selectedAccountType}
          label="Filter by Account Type"
          onChange={(e) => setSelectedAccountType(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {accountTypes.map((type) => (
            <MenuItem key={type.accountTypeId} value={type.accountTypeId}>
              {type.typeName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Paper sx={{ p: 4 }} elevation={3}>
        {(loadingFeatures || loadingAccounts) && <CircularProgress />}
        {errorFeatures && (
          <Typography color="error">{errorFeatures}</Typography>
        )}

        {!loadingFeatures && filteredFeatures.length === 0 && (
          <Typography>No features available.</Typography>
        )}

        {!loadingFeatures && filteredFeatures.length > 0 && (
          <Stack spacing={3}>
            {filteredFeatures.map((feature) => (
              <Paper
                key={feature.featureId}
                sx={{
                  p: 3,
                  position: "relative",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.01)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {/* زر حذف */}
                <IconButton
                  color="error"
                  onClick={() => {
                    setFeatureToDelete(feature);
                    setOpenDeleteDialog(true);
                  }}
                  sx={{ position: "absolute", top: 10, right: 10 }}
                >
                  <DeleteSweepOutlinedIcon />
                </IconButton>

                <Typography variant="h6" fontWeight={600}>
                  {feature.featureName}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {feature.description}
                </Typography>

                <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                  {feature.accountTypeFeatures.length > 0 ? (
                    feature.accountTypeFeatures.map((a) => (
                      <Chip
                        key={a.id}
                        label={
                          a.accountType?.typeName ||
                          `Account ${a.accountTypeId}`
                        }
                        size="small"
                        color="primary"
                      />
                    ))
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      No linked account types
                    </Typography>
                  )}
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Paper>

      {/* Dialog حذف */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete feature "
            {featureToDelete?.featureName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
