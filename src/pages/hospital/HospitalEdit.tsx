// src/pages/hospital/HospitalEdit.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHospitalDetail, updateHospital } from "../../api/hospitalApi";
import { Save, X } from "lucide-react";

const HospitalEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactPerson: "",
    phone: "",
    email: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getHospitalDetail(Number(id));
        const data = res.data.data;
        setFormData({
          name: data.name,
          address: data.address,
          contactPerson: data.contactPerson,
          phone: data.phone,
          email: data.email
        });
      } catch (err) {
        console.error("Failed to load hospital", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateHospital(Number(id), formData);
      navigate(`/hospital/detail/${id}`);
    } catch (err) {
      alert("Error updating hospital details");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-5 text-center">Loading form...</div>;

  return (
    <div className="container-fluid p-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white p-4 border-bottom">
              <h4 className="fw-bold mb-1">Edit Hospital Profile</h4>
              <p className="text-muted small mb-0">Update the information for {formData.name}</p>
            </div>
            <form onSubmit={handleSubmit} className="card-body p-4">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-bold">Hospital Name</label>
                  <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Contact Person</label>
                  <input type="text" name="contactPerson" className="form-control" value={formData.contactPerson} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Email</label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Phone Number</label>
                  <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold">Full Address</label>
                  <textarea name="address" className="form-control" rows={3} value={formData.address} onChange={handleChange} required />
                </div>
              </div>

              <div className="d-flex gap-2 mt-4 pt-3 border-top">
                <button type="submit" disabled={saving} className="btn btn-primary px-4 d-flex align-items-center gap-2">
                  <Save size={18} /> {saving ? "Updating..." : "Save Changes"}
                </button>
                <button type="button" onClick={() => navigate(-1)} className="btn btn-light px-4 d-flex align-items-center gap-2">
                  <X size={18} /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalEdit;