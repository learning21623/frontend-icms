// src/pages/Dashboard.tsx
import { GridLegacy as Grid } from '@mui/material';
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
import { ArrowBack, Edit, Delete } from "@mui/icons-material";

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

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0); // MUI uses 0-based index
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    role: "customer",
  });
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const rowsPerPage = 10; // fixed

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/list", {
        params: { page: page + 1, limit: rowsPerPage }, // backend expects 1-based
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
  }, [page]); // refetch when page changes

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (editUserId) {
        await axios.put(
          `http://localhost:8000/api/user/update?userId=${editUserId}`,
          formData,
          { withCredentials: true }
        );
        alert("User updated successfully!");
      } else {
        await axios.post("http://localhost:8000/api/user/add", formData, {
          withCredentials: true,
        });
        alert("User created successfully!");
      }
      setShowForm(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        role: "customer",
      });
      setEditUserId(null);
      fetchUsers();
    } catch (error) {
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
      await axios.delete(
        `http://localhost:8000/api/user/delete?userId=${userId}`,
        { withCredentials: true }
      );
      fetchUsers();
    } catch {
      alert("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.mobile.includes(search)
  );

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>

      {showForm ? (
        <Paper sx={{ p: 4, position: "relative" }}>
          {/* Back Button */}
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
            {/* First Name */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>

            {/* Email */}
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

            {/* Mobile */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </Grid>

            {/* Password (only when adding new user) */}
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

            {/* Role */}
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
          {/* Search + Add Button */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  mobile: "",
                  password: "",
                  role: "customer",
                });
                setEditUserId(null);
                setShowForm(true);
              }}
            >
              + Add User
            </Button>
          </Box>

          {/* Table */}
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
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
                    <TableCell>
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

            {/* Pagination */}
            <TablePagination
              component="div"
              count={totalCount}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]} // fixed 10
            />
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
