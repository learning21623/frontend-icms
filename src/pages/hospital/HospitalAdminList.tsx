// src/pages/hospital/HospitalAdminList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHospitalUserList } from "../../api/userApi";
import { Plus, Building2, Mail, Phone, Search, X, Download, User } from "lucide-react";
import * as XLSX from "xlsx";

const HospitalAdminList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredHospitals = hospitals.filter((hospital: any) =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ------------------- Updated Export Logic -------------------
  const handleExportExcel = () => {
    const excelData = filteredHospitals.map((hospital: any) => {
      // Get the first admin's mobile if available
      const adminMobile = hospital.users?.[0]?.mobile || "";
      const adminNames = hospital.users?.map((u: any) => `${u.firstName} ${u.lastName}`).join(", ") || "";

      return {
        "Hospital ID": hospital.id,
        "Hospital Name": hospital.name,
        "Hospital Email": hospital.email,
        "Admin Name": adminNames,
        "Admin Mobile": adminMobile,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hospitals");

    // Column widths
    worksheet["!cols"] = [
      { wch: 12 }, // ID
      { wch: 25 }, // Hospital Name
      { wch: 25 }, // Email
      { wch: 25 }, // Admin Name
      { wch: 20 }, // Admin Mobile
    ];

    XLSX.writeFile(workbook, `Hospital_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1">Hospital & Admin Management</h3>
          <p className="text-muted small">View hospital registrations and their assigned system administrators.</p>
        </div>
        <div className="d-flex gap-2">
          <button
            onClick={handleExportExcel}
            className="btn btn-outline-success d-flex align-items-center gap-2 px-3 shadow-sm"
            disabled={filteredHospitals.length === 0}
          >
            <Download size={18} />
            Export Excel
          </button>
          <Link to="/hospital/add" className="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm">
            <Plus size={18} />
            Add New Hospital
          </Link>
        </div>
      </div>

      <div className="row mb-4 g-3">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3 h-100 justify-content-center bg-primary text-white">
            <div className="small fw-bold text-uppercase opacity-75">Total Hospitals</div>
            <div className="h4 fw-bold mb-0">{filteredHospitals.length}</div>
          </div>
        </div>
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
                <button className="btn btn-link text-muted" onClick={() => setSearchTerm("")}>
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-uppercase">
              <tr style={{ fontSize: '12px' }}>
                <th className="ps-4 py-3">Hospital Details</th>
                <th>Contact Info</th>
                <th>Assigned Admin</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map((hospital: any) => (
                  <tr key={hospital.id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 p-2 rounded me-3 text-primary">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{hospital.name}</div>
                          <div className="text-muted extra-small" style={{ fontSize: '11px' }}>ID: #{hospital.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-1 small">
                        <span className="d-flex align-items-center gap-2">
                          <Mail size={14} className="text-muted" /> {hospital.email}
                        </span>
                      </div>
                    </td>
                    <td>
                      {hospital.users && hospital.users.length > 0 ? (
                        hospital.users.map((u: any) => (
                          <div key={u.id} className="d-flex flex-column mb-2">
                            <div className="d-flex align-items-center gap-2">
                              <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle" style={{ fontSize: '10px' }}>
                                ADMIN
                              </span>
                              <span className="small fw-bold text-dark">{u.firstName} {u.lastName}</span>
                            </div>
                            <div className="text-muted small ps-1 mt-1">
                              <Phone size={12} className="me-1" /> {u.mobile}
                            </div>
                          </div>
                        ))
                      ) : (
                        <span className="text-muted small italic">No Admin Assigned</span>
                      )}
                    </td>
                    <td className="text-end pe-4">
                      <div className="btn-group btn-group-sm bg-white border rounded shadow-sm">
                        <Link to={`/hospital/detail/${hospital.id}`} className="btn btn-light text-primary fw-medium px-3">
                          Details
                        </Link>
                        <Link to={`/hospital/edit/${hospital.id}`} className="btn btn-primary px-3">
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-muted">
                    No hospitals found.
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