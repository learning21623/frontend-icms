// src/pages/hospital/HospitalAdminList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHospitalUserList } from "../../api/userApi";
import { Plus, Building2, Mail, Phone, Search, X } from "lucide-react";

const HospitalAdminList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search

  const loadData = async () => {
    setLoading(true);
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

  useEffect(() => {
    loadData();
  }, []);

  // ------------------- Search Filter Logic -------------------
  const filteredHospitals = hospitals.filter((hospital: any) =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1">Hospital & Admin Management</h3>
          <p className="text-muted small">View and manage hospital registrations and their assigned administrators.</p>
        </div>
        <Link to="/hospital/add" className="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm">
          <Plus size={18} />
          Add New Hospital
        </Link>
      </div>

      {/* Stats & Search Section */}
      <div className="row mb-4 g-3">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3 h-100 justify-content-center">
            <div className="text-muted small fw-bold text-uppercase">Total Hospitals</div>
            <div className="h4 fw-bold mb-0">{filteredHospitals.length}</div>
          </div>
        </div>
        
        {/* HOSPITAL SEARCH BAR */}
        <div className="col-md-9">
          <div className="card border-0 shadow-sm p-2 h-100">
            <div className="input-group input-group-lg border-0">
              <span className="input-group-text bg-transparent border-0 pe-0">
                <Search size={20} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-0 shadow-none fs-6"
                placeholder="Search by Hospital Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="btn btn-link text-muted" 
                  onClick={() => setSearchTerm("")}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">Hospital Details</th>
                <th>Contact Info</th>
                <th>Assigned Admins</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map((hospital: any) => (
                  <tr key={hospital.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                          <Building2 className="text-primary" size={20} />
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{hospital.name}</div>
                          <div className="text-muted small">ID: #{hospital.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-1 small">
                        <span className="d-flex align-items-center gap-2">
                          <Mail size={14} className="text-muted" /> {hospital.email}
                        </span>
                        {hospital.phone && (
                          <span className="d-flex align-items-center gap-2 text-muted">
                            <Phone size={14} /> {hospital.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      {hospital.users && hospital.users.length > 0 ? (
                        hospital.users.map((u: any) => (
                          <div key={u.id} className="d-flex align-items-center gap-2 mb-1">
                            <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle small">
                              Admin
                            </span>
                            <span className="small fw-medium">{u.firstName} {u.lastName}</span>
                          </div>
                        ))
                      ) : (
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="badge rounded-pill bg-info-subtle text-info border border-info-subtle small">
                            Primary Admin
                          </span>
                          <span className="small fw-medium">{hospital.contactPerson || "Not Set"}</span>
                        </div>
                      )}
                    </td>
                    <td className="text-end pe-4">
                      <div className="btn-group shadow-sm">
                        <Link to={`/hospital/detail/${hospital.id}`} className="btn btn-sm btn-outline-secondary px-3">
                          Details
                        </Link>
                        <Link to={`/hospital/edit/${hospital.id}`} className="btn btn-sm btn-primary px-3">
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-muted">
                    {searchTerm ? `No hospitals matching "${searchTerm}"` : "No hospitals found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalAdminList;