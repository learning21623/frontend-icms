// src/pages/doctor/EditDoctor.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { getDoctorDetail, updateDoctor } from "../../api/doctorApi";
import { updateUser } from "../../api/userApi";
import { toast, ToastContainer } from "react-toastify";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "", // Added email to state
    mobile: "",
    specialization: "",
    userId: 0
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getDoctorDetail(Number(id));
        const data = res.data.data;
        setFormData({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email, // Mapping email from user object
          mobile: data.user.mobile,
          specialization: data.specialization,
          userId: data.userId
        });
        setLoading(false);
      } catch (err) {
        toast.error("Error loading doctor details");
        navigate("/doctor");
      }
    };
    fetchDetails();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Update User Details (Name, Mobile)
      await updateUser(formData.userId, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.mobile
        // Note: We generally don't send email here if it's read-only
      });

      // 2. Update Doctor Details (Specialization)
      await updateDoctor(Number(id), {
        specialization: formData.specialization
      });

      toast.success("Doctor updated successfully");
      setTimeout(() => navigate("/doctor"), 1500);
    } catch (err) {
      toast.error("Failed to update doctor");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Card className="m-4 p-4 shadow-sm border-0">
      <h3 className="mb-4">Edit Doctor</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                value={formData.firstName} 
                onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                value={formData.lastName} 
                onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* --- Email ID Field (Read-Only) --- */}
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type="email"
            value={formData.email} 
            readOnly 
            disabled
            style={{ backgroundColor: "#f8f9fa", cursor: "not-allowed" }}
          />
          <Form.Text className="text-muted">
            Email address cannot be changed.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Specialization</Form.Label>
          <Form.Control 
            value={formData.specialization} 
            onChange={(e) => setFormData({...formData, specialization: e.target.value})} 
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Mobile</Form.Label>
          <Form.Control 
            value={formData.mobile} 
            onChange={(e) => setFormData({...formData, mobile: e.target.value})} 
            required
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary">Update Doctor</Button>
          <Button variant="outline-secondary" onClick={() => navigate("/doctor")}>Cancel</Button>
        </div>
      </Form>
      <ToastContainer />
    </Card>
  );
};

export default EditDoctor;