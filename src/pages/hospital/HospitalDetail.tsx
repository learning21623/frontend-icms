// src/pages/hospital/HospitalDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getHospitalDetail } from "../../api/hospitalApi";
import { ArrowLeft, Building2, Mail, Phone, MapPin, User, Calendar, Edit } from "lucide-react";

const HospitalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getHospitalDetail(Number(id));
        setHospital(res.data.data);
      } catch (err) {
        console.error("Error fetching details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <button 
        onClick={() => navigate("/users")} 
        className="btn btn-link text-decoration-none p-0 mb-4 d-flex align-items-center gap-2 text-muted"
      >
        <ArrowLeft size={18} /> Back to Management
      </button>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-header bg-white border-bottom p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 p-3 rounded">
                <Building2 className="text-primary" size={28} />
              </div>
              <div>
                <h4 className="fw-bold mb-0">{hospital?.name}</h4>
                <p className="text-muted small mb-0">Hospital ID: #{hospital?.id}</p>
              </div>
            </div>
            <Link to={`/hospital/edit/${id}`} className="btn btn-primary d-flex align-items-center gap-2 px-4">
              <Edit size={18} /> Edit Profile
            </Link>
          </div>
        </div>

        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="p-3 border rounded bg-light bg-opacity-50">
                <label className="text-muted small fw-bold text-uppercase mb-2 d-block">Contact Person</label>
                <div className="d-flex align-items-center gap-2">
                  <User size={18} className="text-primary" />
                  <span className="fw-medium text-dark">{hospital?.contactPerson}</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 border rounded bg-light bg-opacity-50">
                <label className="text-muted small fw-bold text-uppercase mb-2 d-block">Email Address</label>
                <div className="d-flex align-items-center gap-2">
                  <Mail size={18} className="text-primary" />
                  <span className="text-dark">{hospital?.email}</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 border rounded bg-light bg-opacity-50">
                <label className="text-muted small fw-bold text-uppercase mb-2 d-block">Phone Number</label>
                <div className="d-flex align-items-center gap-2">
                  <Phone size={18} className="text-primary" />
                  <span className="text-dark">{hospital?.phone}</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 border rounded bg-light bg-opacity-50">
                <label className="text-muted small fw-bold text-uppercase mb-2 d-block">Created On</label>
                <div className="d-flex align-items-center gap-2">
                  <Calendar size={18} className="text-primary" />
                  <span className="text-dark">{new Date(hospital?.createdAt).toLocaleDateString('en-GB')}</span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="p-3 border rounded bg-light bg-opacity-50">
                <label className="text-muted small fw-bold text-uppercase mb-2 d-block">Office Address</label>
                <div className="d-flex align-items-start gap-2">
                  <MapPin size={18} className="text-primary mt-1" />
                  <span className="text-dark">{hospital?.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;