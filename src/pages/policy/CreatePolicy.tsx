// src/pages/policies/CreatePolicy.tsx
import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { GridLegacy as Grid } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { addPolicy, getCustomers, getInsurers } from "../../api/policyApi";
import { POLICY_TYPES } from "../../constants/policyTypes";
import { generatePolicyNumber } from "../../utils/generatePolicyNumber";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // ✅ load from .env

interface PolicyForm {
  policyType: string;
  policyNumber: string;
  sumAssured: string; // keep as string for inputs, convert later
  premium: string;
  startDate: string;
  endDate: string;
  status: string;
  userId: string;
  insurerId: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const CreatePolicy: React.FC = () => {
  const [formData, setFormData] = useState<PolicyForm>({
    policyType: "",
    policyNumber: "",
    sumAssured: "",
    premium: "",
    startDate: "",
    endDate: "",
    status: "active",
    userId: "",
    insurerId: "",
  });

  const [customers, setCustomers] = useState<User[]>([]);
  const [insurers, setInsurers] = useState<User[]>([]);
  const navigate = useNavigate();

  // ✅ Fetch customers + insurers
  useEffect(() => {
    const fetchData = async () => {
      const resCustomers = await getCustomers();
      const resInsurers = await getInsurers();
      setCustomers(resCustomers.data?.data?.users || []);
      setInsurers(resInsurers.data?.data?.users || []);
    };
    fetchData();
  }, []);

  // ✅ Auto-generate Policy Number
  useEffect(() => {
    if (formData.policyType) {
      const newNumber = generatePolicyNumber(formData.policyType);
      setFormData((prev) => ({ ...prev, policyNumber: newNumber }));
    }
  }, [formData.policyType]);

  // ✅ Handle text inputs
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle dropdowns
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name!]: value });
  };

  // ✅ Submit form
  const handleSubmit = async () => {
    const payload = {
      policyType: formData.policyType,
      policyNumber: formData.policyNumber,
      sumAssured: Number(formData.sumAssured),
      premium: Number(formData.premium),
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: formData.status,
      userId: Number(formData.userId),       // 👈 convert to number
      insurerId: Number(formData.insurerId), // 👈 convert to number
    };

    try {
      await addPolicy(payload);
      navigate("/policies");
    } catch (error) {
      console.error("Failed to add policy:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Add New Policy
      </Typography>

      <Grid container spacing={2}>
        {/* Policy Type */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Policy Type</InputLabel>
            <Select
              name="policyType"
              value={formData.policyType}
              onChange={handleSelectChange}
            >
              {POLICY_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Policy Number */}
        <Grid item xs={6}>
          <TextField
            label="Policy Number"
            name="policyNumber"
            value={formData.policyNumber}
            fullWidth
            disabled
          />
        </Grid>

        {/* Sum Assured */}
        <Grid item xs={6}>
          <TextField
            label="Sum Assured"
            name="sumAssured"
            value={formData.sumAssured}
            onChange={handleInputChange}
            type="number"
            fullWidth
          />
        </Grid>

        {/* Premium */}
        <Grid item xs={6}>
          <TextField
            label="Premium"
            name="premium"
            value={formData.premium}
            onChange={handleInputChange}
            type="number"
            fullWidth
          />
        </Grid>

        {/* Start Date */}
        <Grid item xs={6}>
          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* End Date */}
        <Grid item xs={6}>
          <TextField
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Status */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleSelectChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Customer */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>User (Customer)</InputLabel>
            <Select
              name="userId"
              value={formData.userId}
              onChange={handleSelectChange}
            >
              {customers.map((u) => (
                <MenuItem key={u.id} value={u.id.toString()}>
                  {u.firstName} {u.lastName} ({u.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Insurer */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Insurer</InputLabel>
            <Select
              name="insurerId"
              value={formData.insurerId}
              onChange={handleSelectChange}
            >
              {insurers.map((u) => (
                <MenuItem key={u.id} value={u.id.toString()}>
                  {u.firstName} {u.lastName} ({u.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/policies")}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreatePolicy;
