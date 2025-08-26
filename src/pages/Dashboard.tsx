import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, LogOut } from "lucide-react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: {
    id: number;
    name: string;
  };
  createdAt: string;
};

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/user/list?page=1&limit=10",
          { withCredentials: true }
        );

        const userList = res.data?.data?.users;
        setUsers(Array.isArray(userList) ? userList : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/user/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h1 className="text-xl font-bold mb-6">Pacific</h1>
        <ul className="space-y-3">
          <li className="font-medium text-gray-700">User Management</li>
          <li className="text-gray-500">Mall Management</li>
          <li className="text-gray-500">Store Management</li>
          <li className="text-gray-500">Event Management</li>
          <li className="text-gray-500">Reports</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">User Management</h2>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
          >
            <LogOut className="w-4 h-4" /> <span>Logout</span>
          </button>
        </div>

        {/* Search + Add */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by name, email, phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
            + Add User
          </button>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Mobile</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
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
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
