import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user/list?page=1&limit=10', {
          withCredentials: true,
        });

        const userList = res.data?.data?.users;
        if (Array.isArray(userList)) {
          setUsers(userList);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
  try {
    await axios.post('http://localhost:8000/api/user/logout', {}, { withCredentials: true });
    localStorage.removeItem('token');
    navigate('/'); // OR navigate('/login'); both are fine
  } catch (err) {
    console.error('Logout failed', err);
  }
};


  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.role?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
