import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  TablePagination,
  Stack,
  Chip,
  InputAdornment,
} from "@mui/material";
import { GridLegacy as Grid } from "@mui/material";
import {
  ArrowBack,
  Edit,
  Delete,
  MailOutline,
  PhoneIphone,
  Search,
} from "@mui/icons-material";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// ------------------- Types -------------------
type RoleOption = "superAdmin" | "admin" | "doctor" | "staff" | string;

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: {
    id: number;
    name: RoleOption;
  };
};

const roleMapping: Record<string, number> = {
  superAdmin: 1,
  admin: 2,
  doctor: 3,
  staff: 4,
};

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0); 
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    role: "admin",
  });
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const rowsPerPage = 10;

  // ------------------- API Calls -------------------
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/list`, {
        params: { page: page + 1, limit: rowsPerPage },
        withCredentials: true,
      });

      setUsers(response.data?.data?.users || []);
      setTotalCount(response.data?.data?.total || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  // ------------------- Handlers -------------------
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const payload: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        roleId: roleMapping[formData.role],
      };

      if (!editUserId && formData.password) payload.password = formData.password;

      if (editUserId) {
        await axios.put(`${API_BASE_URL}/user/update?userId=${editUserId}`, payload, { withCredentials: true });
        alert("User updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/user/add`, payload, { withCredentials: true });
        alert("User created successfully!");
      }

      setShowForm(false);
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to save user");
    }
  };

  const handleEdit = (user: User) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      password: "",
      role: user.role?.name || "admin",
    });
    setEditUserId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (userId: number) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/user/delete?userId=${userId}`, { withCredentials: true });
      fetchUsers();
    } catch {
      alert("Failed to delete user");
    }
  };

  const resetForm = () => {
    setFormData({ firstName: "", lastName: "", email: "", mobile: "", password: "", role: "admin" });
    setEditUserId(null);
  };

  // ------------------- Filter Logic -------------------
  const filteredUsers = users.filter((u) => {
    const term = search.toLowerCase();
    return (
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.mobile.includes(term)
    );
  });

  return (
    <Box p={4}>
      {/* Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight="bold">User Management</Typography>
          <Typography variant="body2" color="textSecondary">Manage system accounts and roles</Typography>
        </Box>
        {!showForm && (
          <Button variant="contained" color="primary" sx={{ borderRadius: "8px" }} onClick={() => { resetForm(); setShowForm(true); }}>
            + Add New User
          </Button>
        )}
      </Stack>

      {showForm ? (
        /* Form View */
        <Paper sx={{ p: 4, borderRadius: "12px" }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <IconButton onClick={() => setShowForm(false)}><ArrowBack /></IconButton>
            <Typography variant="h6">{editUserId ? "Edit User Details" : "Register New User"}</Typography>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} /></Grid>
            {!editUserId && <Grid item xs={12} md={6}><TextField fullWidth type="password" label="Password" name="password" value={formData.password} onChange={handleChange} /></Grid>}
            <Grid item xs={12} md={6}>
              <Select fullWidth name="role" value={formData.role} onChange={handleChange}>
                {Object.keys(roleMapping).map((r) => <MenuItem key={r} value={r}>{r.toUpperCase()}</MenuItem>)}
              </Select>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="contained" size="large" onClick={handleSave}>Save User</Button>
          </Box>
        </Paper>
      ) : (
        /* List View */
        <>
          <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: "12px", border: "1px solid #eef2f6" }}>
            <TextField
              fullWidth
              placeholder="Search by name, email, or mobile..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Paper>

          <Paper elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: "12px", overflow: "hidden" }}>
            <Table>
              <TableHead sx={{ bgcolor: "#f8f9fa" }}>
                <TableRow>
                  <TableCell>USER DETAILS</TableCell>
                  <TableCell>CONTACT</TableCell>
                  <TableCell>ROLE</TableCell>
                  <TableCell align="right">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2">{u.firstName} {u.lastName}</Typography>
                      <Typography variant="caption" color="textSecondary">ID: #{u.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <MailOutline sx={{ fontSize: 14 }} /> <Typography variant="body2">{u.email}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <PhoneIphone sx={{ fontSize: 14 }} /> <Typography variant="body2">{u.mobile}</Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={u.role?.name} 
                        size="small" 
                        variant="outlined" 
                        sx={{ 
                          fontWeight: 600, 
                          fontSize: '11px',
                          backgroundColor: u.role?.name === 'admin' ? '#e3f2fd' : '#f5f5f5',
                          color: u.role?.name === 'admin' ? '#1976d2' : '#616161',
                          border: 'none'
                        }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary" onClick={() => handleEdit(u)}><Edit fontSize="small" /></IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(u.id)}><Delete fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={totalCount}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
            />
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Dashboard;