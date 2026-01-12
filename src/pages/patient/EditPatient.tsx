import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Button, TextField,Typography, Box, 
    CircularProgress, Divider, Card, CardContent, MenuItem 
} from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import { 
    getPatientDetail, 
    updatePatientBasic, 
    updatePatientMedical, 
    updatePatientAmount 
} from '../../api/patientApi';
import Swal from 'sweetalert2';

const EditPatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        // Basic Info
        name: '', phone: '', age: '', gender: 'Male', address: '',
        // Medical Info
        chiefComplaint: '', diagnosis: '', medications: '', roomNumber: '',
        treatmentPlan: '',
        // Billing Info
        initialAmount: 0, approvalAmount: 0, finalAmount: 0, discount: 0, receivedAmount: 0
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getPatientDetail(Number(id));
                const p = res.data.data;
                // Correctly mapping nested arrays from your API
                setFormData({
                    name: p.name || '',
                    phone: p.phone || '',
                    age: p.age || '',
                    gender: p.gender || 'Male',
                    address: p.address || '',
                    chiefComplaint: p.medical?.[0]?.chiefComplaint || '',
                    diagnosis: p.medical?.[0]?.diagnosis || '',
                    medications: p.medical?.[0]?.medications || '',
                    roomNumber: p.medical?.[0]?.roomNumber || '',
                    treatmentPlan: p.medical?.[0]?.treatmentPlan || '',
                    initialAmount: p.amount?.[0]?.initialAmount || 0,
                    approvalAmount: p.amount?.[0]?.approvalAmount || 0,
                    finalAmount: p.amount?.[0]?.finalAmount || 0,
                    discount: p.amount?.[0]?.discount || 0,
                    receivedAmount: p.amount?.[0]?.receivedAmount || 0,
                });
            } catch (err) {
                Swal.fire("Error", "Failed to load patient details", "error");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const pId = Number(id);
            
            // 1. Update Basic
            await updatePatientBasic(pId, {
                name: formData.name, phone: formData.phone, 
                age: Number(formData.age), gender: formData.gender, address: formData.address
            });

            // 2. Update Medical
            await updatePatientMedical(pId, {
                chiefComplaint: formData.chiefComplaint,
                diagnosis: formData.diagnosis,
                medications: formData.medications,
                roomNumber: formData.roomNumber,
                treatmentPlan: formData.treatmentPlan
            });

            // 3. Update Amount
            await updatePatientAmount(pId, {
                initialAmount: Number(formData.initialAmount),
                approvalAmount: Number(formData.approvalAmount),
                finalAmount: Number(formData.finalAmount),
                discount: Number(formData.discount),
                receivedAmount: Number(formData.receivedAmount)
            });

            await Swal.fire("Success", "All records updated successfully", "success");
            navigate('/patient');
        } catch (error: any) {
            console.error("Update failed:", error.response?.data || error.message);
            Swal.fire("Update Failed", "Check console for API details", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;

    return (
        <Box p={4} sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="bold" color="#1a237e">Edit Patient Profile</Typography>
                <Box>
                    <Button variant="outlined" onClick={() => navigate('/patient')} sx={{ mr: 2 }}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
                        {saving ? "Saving..." : "Save All Changes"}
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {/* Basic Information */}
                <Grid item xs={12} md={4}>
                    <Card elevation={2} sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">Basic Information</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField fullWidth label="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                <TextField fullWidth label="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                <TextField fullWidth select label="Gender" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </TextField>
                                <TextField fullWidth label="Age" type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                                <TextField fullWidth multiline rows={2} label="Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Medical Information */}
                <Grid item xs={12} md={8}>
                    <Card elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="error">Medical Diagnosis & Treatment</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}><TextField fullWidth label="Chief Complaint" value={formData.chiefComplaint} onChange={e => setFormData({...formData, chiefComplaint: e.target.value})} /></Grid>
                                <Grid item xs={6}><TextField fullWidth label="Diagnosis" value={formData.diagnosis} onChange={e => setFormData({...formData, diagnosis: e.target.value})} /></Grid>
                                <Grid item xs={6}><TextField fullWidth label="Medications" value={formData.medications} onChange={e => setFormData({...formData, medications: e.target.value})} /></Grid>
                                <Grid item xs={6}><TextField fullWidth label="Room Number" value={formData.roomNumber} onChange={e => setFormData({...formData, roomNumber: e.target.value})} /></Grid>
                                <Grid item xs={12}><TextField fullWidth multiline rows={2} label="Treatment Plan" value={formData.treatmentPlan} onChange={e => setFormData({...formData, treatmentPlan: e.target.value})} /></Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Billing Information */}
                    <Card elevation={2} sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="green">Billing & Insurance Details</Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={4}><TextField fullWidth type="number" label="Initial Amount" value={formData.initialAmount} onChange={e => setFormData({...formData, initialAmount: Number(e.target.value)})} /></Grid>
                                <Grid item xs={4}><TextField fullWidth type="number" label="Approval Amount" value={formData.approvalAmount} onChange={e => setFormData({...formData, approvalAmount: Number(e.target.value)})} /></Grid>
                                <Grid item xs={4}><TextField fullWidth type="number" label="Final Amount" value={formData.finalAmount} onChange={e => setFormData({...formData, finalAmount: Number(e.target.value)})} /></Grid>
                                <Grid item xs={6}><TextField fullWidth type="number" label="Discount" value={formData.discount} onChange={e => setFormData({...formData, discount: Number(e.target.value)})} /></Grid>
                                <Grid item xs={6}><TextField fullWidth type="number" label="Received Amount" value={formData.receivedAmount} onChange={e => setFormData({...formData, receivedAmount: Number(e.target.value)})} /></Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EditPatient;