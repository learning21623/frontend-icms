import { Dialog, DialogTitle } from "@mui/material";

const DoctorModal = ({ open, onClose }: any) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add / Edit Doctor</DialogTitle>
    </Dialog>
  );
};

export default DoctorModal;
