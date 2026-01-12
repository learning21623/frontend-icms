import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button, Table, TableBody, TableRow, TableCell,
    TableHead, Paper, TableContainer, IconButton, TextField, InputAdornment,
    Tooltip
} from "@mui/material";
import { Edit, Visibility, Search, PersonAdd, Delete } from "@mui/icons-material";
import { getPatientList, deletePatient } from "../../api/patientApi";
import { useAuth } from "../../context/AuthContext"; 
import Swal from "sweetalert2";

const PatientList = () => {
    const { user } = useAuth(); 
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchPatients = useCallback(async () => {
        try {
            const res = await getPatientList(1, 10, searchTerm);
            setPatients(res.data.data);
        } catch (err) {
            console.error("Error loading patients", err);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the patient record!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                await deletePatient(id);
                Swal.fire("Deleted!", "Patient has been removed.", "success");
                fetchPatients();
            } catch (err) {
                Swal.fire("Error", "Failed to delete patient", "error");
            }
        }
    };

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold m-0">Patient Management</h3>
                    <p className="text-muted">Manage hospital patient records and history</p>
                </div>
                {/* Staff usually handles registration */}
                {user?.role === "staff" && (
                    <Button
                        variant="contained"
                        startIcon={<PersonAdd />}
                        onClick={() => navigate("/patient/add")}
                        sx={{ borderRadius: "8px", textTransform: "none", fontWeight: "bold" }}
                    >
                        Add New Patient
                    </Button>
                )}
            </div>

            <Paper sx={{ p: 3, borderRadius: "12px", boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by name, phone, or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mb: 3 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color="action" />
                            </InputAdornment>
                        ),
                    }}
                />

                <TableContainer>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#fbfbfb" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>PATIENT DETAILS</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>CONTACT</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>GENDER/AGE</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold" }}>ACTIONS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {patients.map((p: any) => (
                                <TableRow key={p.id} hover>
                                    <TableCell>
                                        <div style={{ fontWeight: 600, color: "#2c3e50" }}>{p.name}</div>
                                        <div style={{ fontSize: "0.8rem", color: "#7f8c8d" }}>ID: #{p.id}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div>{p.phone}</div>
                                        <div style={{ fontSize: "0.8rem", color: "#95a5a6" }}>{p.address}</div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="badge bg-light text-dark text-capitalize">{p.gender}</span>
                                        <span className="ms-2">{p.age} Years</span>
                                    </TableCell>
                                    <TableCell align="center">
                                        {/* View is visible to everyone */}
                                        <Tooltip title="View History">
                                            <IconButton color="info" onClick={() => navigate(`/patient/detail/${p.id}`)}>
                                                <Visibility fontSize="small" />
                                            </IconButton>
                                        </Tooltip>

                                        {/* 1. DOCTOR: CAN DELETE, CANNOT EDIT */}
                                        {user?.role === "doctor" && (
                                            <Tooltip title="Delete Record">
                                                <IconButton color="error" onClick={() => handleDelete(p.id)}>
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}

                                        {/* 2. STAFF: CAN EDIT, CANNOT DELETE */}
                                        {user?.role === "staff" && (
                                            <Tooltip title="Edit Profile">
                                                <IconButton color="primary" onClick={() => navigate(`/patient/edit/${p.id}`)}>
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        
                                        {/* 3. ADMIN: Can see everything */}
                                        {user?.role === "admin" && (
                                            <>
                                                <IconButton color="primary" onClick={() => navigate(`/patient/edit/${p.id}`)}>
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDelete(p.id)}>
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default PatientList;