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
    <Card className="m-4 p-4 shadow-sm">
      <h3>Edit Doctor</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                value={formData.firstName} 
                onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                value={formData.lastName} 
                onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Specialization</Form.Label>
          <Form.Control 
            value={formData.specialization} 
            onChange={(e) => setFormData({...formData, specialization: e.target.value})} 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mobile</Form.Label>
          <Form.Control 
            value={formData.mobile} 
            onChange={(e) => setFormData({...formData, mobile: e.target.value})} 
          />
        </Form.Group>
        <Button type="submit" variant="primary">Update Doctor</Button>
        <Button variant="link" onClick={() => navigate("/doctor")}>Cancel</Button>
      </Form>
      <ToastContainer />
    </Card>
  );
};

export default EditDoctor;