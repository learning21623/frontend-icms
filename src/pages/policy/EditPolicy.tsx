import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { GridLegacy as Grid } from '@mui/material';
import { getPolicyDetails, updatePolicy } from "../../api/policyApi";
import { POLICY_TYPES } from "../../constants/policyTypes";

const EditPolicy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicy = async () => {
      if (id) {
        const res = await getPolicyDetails(Number(id));
        setFormData(res.data.data);
      }
    };
    fetchPolicy();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await updatePolicy(Number(id), formData);
    navigate("/policies");
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Edit Policy
      </Typography>

      <Grid container spacing={2}>
        {/* Policy Number (read-only) */}


        {/* Policy Type */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Policy Type</InputLabel>
            <Select
              name="policyType"
              value={formData.policyType || ""}
              onChange={handleSelectChange}
              label="Policy Type"
            >
              {POLICY_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Sum Assured */}
        <Grid item xs={6}>
          <TextField
            label="Sum Assured"
            name="sumAssured"
            value={formData.sumAssured || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Premium */}
        <Grid item xs={6}>
          <TextField
            label="Premium"
            name="premium"
            value={formData.premium || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Start Date */}
        <Grid item xs={6}>
          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        {/* End Date */}
        <Grid item xs={6}>
          <TextField
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        {/* Status Dropdown */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status || ""}
              onChange={handleSelectChange}
              label="Status"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Update
        </Button>
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={() => navigate("/policies")}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditPolicy;
