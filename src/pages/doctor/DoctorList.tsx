// src/pages/doctor/DoctorList.tsx
import { useEffect, useState } from "react";
import { Button, Table, TableRow, TableCell } from "@mui/material";
import { getDoctorList } from "../../api/doctorApi";
import DoctorModal from "../doctor/DoctorModal";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);

  const loadDoctors = async () => {
    const res = await getDoctorList();
    setDoctors(res.data.data);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Doctor</Button>

      <Table>
        {doctors.map((d: any) => (
          <TableRow key={d.id}>
            <TableCell>{d.name}</TableCell>
            <TableCell>{d.specialization}</TableCell>
          </TableRow>
        ))}
      </Table>

      <DoctorModal
        open={open}
        onClose={() => {
          setOpen(false);
          loadDoctors();
        }}
      />
    </>
  );
};

export default DoctorList;
