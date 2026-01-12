import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    TextField, Button, MenuItem, Paper, Typography, Box 
} from "@mui/material";
import { GridLegacy as Grid } from "@mui/material";
import { addPatient, getDoctorListForDropdown } from "../../api/patientApi";
import Swal from "sweetalert2";

const AddPatient = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        age: "",
        gender: "Male",
        address: "",
        initialAmount: "",
        chiefComplaint: "",
        diagnosis: "",
        doctorId: "", // This must match a valid ID from your backend
        status: "process",
        note: "Urgent registration"
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await getDoctorListForDropdown();
                setDoctors(res.data.data);
            } catch (err) {
                console.error("Failed to fetch doctors", err);
            }
        };
        fetchDoctors();
    }, []);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Ensure numbers are sent as numbers, not strings
            const payload = {
                ...formData,
                age: Number(formData.age),
                initialAmount: Number(formData.initialAmount),
                doctorId: Number(formData.doctorId)
            };

            await addPatient(payload);
            Swal.fire("Success", "Patient record created successfully", "success");
            navigate("/patient");
        } catch (err: any) {
            Swal.fire("Error", err.response?.data?.message || "Failed to add patient record", "error");
        }
    };

    return (
        <Box p={4}>
            <Paper sx={{ p: 4, borderRadius: "12px" }}>
                <Typography variant="h5" fontWeight="bold" mb={3}>Add New Patient</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Full Name" name="name" required onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Phone Number" name="phone" required onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth label="Age" name="age" type="number" required onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth select label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        
                        {/* New Doctor Selection Column */}
                        <Grid item xs={12} md={4}>
                            <TextField 
                                fullWidth 
                                select 
                                label="Assign Doctor" 
                                name="doctorId" 
                                required 
                                value={formData.doctorId} 
                                onChange={handleChange}
                            >
                                {doctors.map((doc: any) => (
                                    <MenuItem key={doc.id} value={doc.id}>
                                        Dr. {doc.user.firstName} {doc.user.lastName} ({doc.specialization})
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth label="Address" name="address" multiline rows={2} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Initial Deposit Amount" name="initialAmount" type="number" required onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Chief Complaint" name="chiefComplaint" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Initial Medical Note" name="note" multiline rows={3} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <Button type="submit" variant="contained" size="large" sx={{ mr: 2 }}>Save Patient</Button>
                            <Button variant="outlined" size="large" onClick={() => navigate("/patient")}>Cancel</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default AddPatient;