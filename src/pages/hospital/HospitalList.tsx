// src/pages/hospital/HospitalList.tsx
import { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { getHospitalList } from "../../api/hospitalApi";
import HospitalModal from "../hospital/HospitalModal";

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const loadHospitals = async () => {
    const res = await getHospitalList();
    setHospitals(res.data.data);
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Hospital
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hospitals.map((h: any) => (
            <TableRow key={h.id}>
              <TableCell>{h.name}</TableCell>
              <TableCell>{h.email}</TableCell>
              <TableCell>
                <Button onClick={() => {
                  setSelected(h);
                  setOpen(true);
                }}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <HospitalModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelected(null);
          loadHospitals();
        }}
        hospital={selected}
      />
    </>
  );
};

export default HospitalList;
