// src/pages/hospital/HospitalModal.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { addHospital, updateHospital } from "../../api/hospitalApi";

const HospitalModal = ({ open, onClose, hospital }: any) => {
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (hospital) setForm(hospital);
  }, [hospital]);

  const submit = async () => {
    hospital
      ? await updateHospital(hospital.id, form)
      : await addHospital(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{hospital ? "Edit" : "Add"} Hospital</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Button onClick={submit} variant="contained">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default HospitalModal;
