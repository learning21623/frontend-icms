// src/pages/staff/StaffList.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Button, Table, TableBody, TableRow, TableCell, 
  TableHead, Paper, TableContainer, IconButton, Tooltip 
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getStaffList, deleteStaff } from "../../api/staffApi";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const navigate = useNavigate();

  const loadStaff = async () => {
    try {
      const res = await getStaffList();
      setStaff(res.data.data); 
    } catch (err) {
      console.error("Failed to fetch staff", err);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Staff Member?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete"
    });

    if (result.isConfirmed) {
      try {
        await deleteStaff(id);
        toast.success("Staff deleted successfully");
        loadStaff();
      } catch (err) {
        toast.error("Failed to delete staff");
      }
    }
  };

  useEffect(() => { loadStaff(); }, []);

  return (
    <TableContainer component={Paper} sx={{ p: 2, mt: 3 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Staff Management</h3>
        <Button variant="contained" onClick={() => navigate("/staff/add")}>
          + Add Staff
        </Button>
      </div>

      <Table>
        <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role/Designation</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staff.map((s: any) => (
            <TableRow key={s.id} hover>
              <TableCell>{s.id}</TableCell>
              <TableCell>{s.user?.firstName} {s.user?.lastName}</TableCell>
              <TableCell>{s.user?.email}</TableCell>
              <TableCell>{s.role || "General Staff"}</TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => navigate(`/staff/edit/${s.id}`)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(s.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ToastContainer />
    </TableContainer>
  );
};

export default StaffList;