// src/pages/hospital/AddHospital.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addHospital } from "../../api/hospitalApi";
import { ArrowLeft, Save } from "lucide-react";

const AddHospital = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
  name: "",
  address: "",
  contactPerson: "", // This will be displayed as Primary Admin in the list
  phone: "",
  email: ""
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await addHospital(formData);
      if (response.status === 200 || response.status === 201) {
        alert("Hospital Registered Successfully!");
        navigate("/users"); // Redirect back to list
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Error adding hospital");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <button onClick={() => navigate(-1)} className="btn btn-link text-decoration-none text-muted mb-3 d-flex align-items-center gap-2 p-0">
        <ArrowLeft size={18} /> Back to List
      </button>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Register New Hospital</h4>
              
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">Hospital Name <span className="text-danger">*</span></label>
                    <input type="text" name="name" className="form-control form-control-lg" placeholder="e.g. City General Hospital" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Official Email <span className="text-danger">*</span></label>
                    <input type="email" name="email" className="form-control" placeholder="contact@hospital.com" value={formData.email} onChange={handleChange} required />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Phone Number</label>
                    <input type="text" name="phone" className="form-control" placeholder="+91 ..." value={formData.phone} onChange={handleChange} />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Contact Person (Primary Admin)</label>
                    <input type="text" name="contactPerson" className="form-control" placeholder="Dr. John Doe" value={formData.contactPerson} onChange={handleChange} />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Full Address</label>
                    <textarea name="address" className="form-control" rows={3} placeholder="Street, City, State, Zip..." value={formData.address} onChange={handleChange}></textarea>
                  </div>

                  <div className="col-12 mt-4 pt-2 border-top d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-light px-4" onClick={() => navigate(-1)}>Cancel</button>
                    <button type="submit" className="btn btn-primary px-4 d-flex align-items-center gap-2" disabled={loading}>
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status"></span>
                      ) : <Save size={18} />}
                      Save Hospital
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHospital;