// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
  createdAt: string;
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

  // 🔹 Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/list`, {
        params: { page: 1, limit: 10 },
        withCredentials: true,
      });

      // ✅ Fix "users.filter is not a function"
      const data = response.data?.data?.users;
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Handle Input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Add or Update User
  const handleSave = async () => {
    try {
      if (editUserId) {
        await axios.put(
          `${API_BASE_URL}/user/update?userId=${editUserId}`,
          formData,
          { withCredentials: true }
        );
        alert("User updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/user/add`, formData, {
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
      console.error("Error saving user:", error);
      alert("Failed to save user");
    }
  };

  // 🔹 Edit User
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

  // 🔹 Delete User
  const handleDelete = async (userId: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(
        `${API_BASE_URL}/user/delete?userId=${userId}`,
        { withCredentials: true }
      );
      alert("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  // 🔹 Filtered Users
  const filteredUsers = users.filter(
    (u) =>
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.mobile.includes(search)
  );

  return (
    <div className="p-6">
      <h4 className="text-2xl font-semibold mb-6">User Management</h4>

      {showForm ? (
        // Add/Edit Form
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h5 className="text-lg font-semibold mb-4 text-center">
            {editUserId ? "Edit User" : "Add New User"}
          </h5>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border px-3 py-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border px-3 py-2 rounded"
              disabled={!!editUserId}
            />
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className="border px-3 py-2 rounded"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border px-3 py-2 rounded"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            >
              {roleOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 mt-4">
            <button
              onClick={() => {
                setShowForm(false);
                setEditUserId(null);
              }}
              className="px-4 py-2 border rounded"
            >
              ⬅ Back
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        // User List
        <>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by name, email, phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-blue-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
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
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow"
            >
              + Add User
            </button>
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Mobile</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.mobile}</td>
                      <td className="px-6 py-4 capitalize">
                        {user.role?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 flex space-x-3">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
