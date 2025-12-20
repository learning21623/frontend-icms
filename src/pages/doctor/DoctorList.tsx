// src/pages/doctor/DoctorList.tsx
import { useEffect, useState } from "react";
import { Button, Table, TableBody, TableRow, TableCell, TableHead, Paper, TableContainer } from "@mui/material";
import { getDoctorList } from "../../api/doctorApi";
import DoctorModal from "./DoctorModal";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);

  const loadDoctors = async () => {
    try {
      const res = await getDoctorList();
      setDoctors(res.data.data); // Based on your JSON: res.data.data is the array
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };

  useEffect(() => { loadDoctors(); }, []);

  return (
    <TableContainer component={Paper} sx={{ p: 2 }}>
      <div className="d-flex justify-content-between mb-3">
        <h3>Doctor Management</h3>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add Doctor</Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Specialization</TableCell>
            <TableCell>Hospital</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((d: any) => (
            <TableRow key={d.id}>
              <TableCell>{d.id}</TableCell>
              {/* Mapping to the correct JSON structure provided */}
              <TableCell>{d.user?.firstName} {d.user?.lastName}</TableCell>
              <TableCell>{d.specialization}</TableCell>
              <TableCell>{d.hospital?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DoctorModal open={open} onClose={() => { setOpen(false); loadDoctors(); }} />
    </TableContainer>
  );
};

export default DoctorList;