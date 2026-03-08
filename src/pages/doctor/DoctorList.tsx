// src/pages/doctor/DoctorList.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button, Table, TableBody, TableRow, TableCell,
  TableHead, Paper, TableContainer, IconButton, Tooltip
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material"; // Material icons
import { getDoctorList, deleteDoctor } from "../../api/doctorApi";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2"; // For a better delete confirmation

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const loadDoctors = async () => {
    try {
      const res = await getDoctorList();
      setDoctors(res.data.data);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await deleteDoctor(id);
        toast.success("Doctor deleted successfully");
        loadDoctors(); // Refresh list
      } catch (err) {
        toast.error("Failed to delete doctor");
      }
    }
  };

  useEffect(() => { loadDoctors(); }, []);

  return (
    <TableContainer component={Paper} sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
      <div className="d-flex justify-content-between align-items-center mb-3 p-2">
        <h2 style={{ fontWeight: 600 }}>Doctor Management</h2>
        <Button variant="contained" color="primary" onClick={() => navigate("/doctor/add")}>
          + Add Doctor
        </Button>
      </div>

      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Specialization</TableCell>
            <TableCell>Designation</TableCell>
            {/* <TableCell>Hospital</TableCell> */}
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((d: any) => (
            <TableRow key={d.id}>
              <TableCell>{d.id}</TableCell>
              <TableCell>{d.user?.firstName} {d.user?.lastName}</TableCell>
              <TableCell>{d.department}</TableCell>
              <TableCell>{d.specialization}</TableCell>
              <TableCell>{d.designation}</TableCell>
              {/* <TableCell>{d.hospital?.name}</TableCell> */}
              <TableCell align="center">
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/doctor/edit/${d.id}`)}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(d.id)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ToastContainer />
    </TableContainer>
  );
};

export default DoctorList;