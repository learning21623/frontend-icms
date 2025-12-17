import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper, Table, TableHead, TableRow,
  TableCell, TableBody, Typography
} from "@mui/material";

const API = process.env.REACT_APP_API_BASE_URL;

const Hospitals = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchHospitals = async () => {
    const res = await axios.get(`${API}/user/hospital-users`, {
      withCredentials: true,
    });
    setData(res.data.data);
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Hospital Admins
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hospital</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Admin Name</TableCell>
            <TableCell>Admin Email</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map(h => (
            <TableRow key={h.id}>
              <TableCell>{h.name}</TableCell>
              <TableCell>{h.email}</TableCell>
              <TableCell>
                {h.users[0]?.firstName} {h.users[0]?.lastName}
              </TableCell>
              <TableCell>{h.users[0]?.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Hospitals;
