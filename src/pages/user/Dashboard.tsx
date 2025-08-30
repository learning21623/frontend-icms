// src/pages/UserDashboard.tsx
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
} from "@mui/material";
import { GridLegacy as Grid } from "@mui/material";
import { ArrowBack, Edit, Delete } from "@mui/icons-material";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // ✅ from .env

// ------------------- Types -------------------
type RoleOption =
  | "admin"
  | "customer"
  | "agent"
  | "tpa"
  | "insurer"
  | "hospital"
  | "garage"
  | "surveyor"
  | "service-provider"
  | "auditor"
  | "nominee"
  | "helpdesk";

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

// ------------------- Role Data -------------------
const roleOptions: RoleOption[] = [
  "admin",
  "customer",
  "agent",
  "tpa",
  "insurer",
  "hospital",
  "garage",
  "surveyor",
  "service-provider",
  "auditor",
  "nominee",
  "helpdesk",
];

// Map frontend role names → backend role IDs
const roleMapping: Record<RoleOption, number> = {
  admin: 1,
  customer: 2,
  agent: 3,
  tpa: 4,
  insurer: 5,
  hospital: 6,
  garage: 7,
  surveyor: 8,
  "service-provider": 9,
  auditor: 10,
  nominee: 11,
  helpdesk: 12,
};

// ------------------- Component -------------------
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
    role: "customer", // ✅ role name for dropdown
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
      setTotalCount(response.data?.data?.count || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  // ------------------- Form Handlers -------------------
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
        roleId: roleMapping[formData.role as RoleOption], // ✅ send roleId
      };

      if (!editUserId && formData.password) {
        payload.password = formData.password;
      }

      if (editUserId) {
        await axios.put(
          `${API_BASE_URL}/user/update?userId=${editUserId}`,
          payload,
          { withCredentials: true }
        );
        alert("User updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/user/add`, payload, {
          withCredentials: true,
        });
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
      role: user.role?.name || "customer",
    });
    setEditUserId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (userId: number) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/user/delete?userId=${userId}`, {
        withCredentials: true,
      });
      fetchUsers();
    } catch {
      alert("Failed to delete user");
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      role: "customer",
    });
    setEditUserId(null);
  };

  // ------------------- Search Filter -------------------
  const filteredUsers = users.filter(
    (u) =>
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.mobile.includes(search)
  );

  // ------------------- Render -------------------
  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        User Management Dashboard
      </Typography>

      {showForm ? (
        <Paper sx={{ p: 4, position: "relative" }}>
          <IconButton
            onClick={() => {
              setShowForm(false);
              setEditUserId(null);
            }}
            sx={{ position: "absolute", top: 16, left: 16 }}
          >
            <ArrowBack />
          </IconButton>

          <Typography variant="h6" textAlign="center" mb={3}>
            {editUserId ? "Edit User" : "Add New User"}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </Grid>
            {!editUserId && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Select
                fullWidth
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                {roleOptions.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Paper>
      ) : (
        <>
          {/* Search + Add */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <TextField
                label="Search User"
                variant="outlined"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
              >
                + Add User
              </Button>
            </Box>
          </Paper>

          {/* Users Table */}
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      {u.firstName} {u.lastName}
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.mobile}</TableCell>
                    <TableCell>{u.role?.name}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleEdit(u)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(u.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              count={totalCount}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
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
