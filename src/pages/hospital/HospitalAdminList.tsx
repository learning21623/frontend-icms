// src/pages/hospital/HospitalAdminList.tsx
import React, { useEffect, useState } from "react";
import { getHospitalUserList } from "../../api/userApi";

const HospitalAdminList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getHospitalUserList();
        if (res.data.success) {
          setHospitals(res.data.data);
        }
      } catch (err) {
        console.error("Error loading hospital admins:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="container-fluid p-4">
      <h3 className="mb-4">Hospital & Admin Management</h3>
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Hospital Name</th>
                <th>Contact Email</th>
                <th>Admin Users</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital: any) => (
                <tr key={hospital.id}>
                  <td><strong>{hospital.name}</strong></td>
                  <td>{hospital.email}</td>
                  <td>
                    {/* Maps through the users array provided by your API */}
                    {hospital.users && hospital.users.length > 0 ? (
                      hospital.users.map((u: any) => (
                        <div key={u.id} className="mb-1">
                          <span className="badge bg-primary me-2">Admin</span>
                          {u.firstName} {u.lastName} <small className="text-muted">({u.email})</small>
                        </div>
                      ))
                    ) : (
                      <span className="text-muted italic">No Admin Assigned</span>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalAdminList;