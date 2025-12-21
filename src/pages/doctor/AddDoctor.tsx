// src/pages/doctor/AddDoctor.tsx
import { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registerUser } from "../../api/userApi";
import { addDoctor } from "../../api/doctorApi";
import { useAuth } from "../../context/AuthContext";

const AddDoctor = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Get admin's hospitalId from context

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    specialization: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Step 1: Create the User account
      const userRes = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        roleId: 3, // ✅ Use numeric ID for 'doctor' per your DB
        hospitalId: user?.hospitalId, // ✅ Associate with admin's hospital
      });

      const newUserId = userRes.data?.data?.id;

      if (newUserId) {
        // Step 2: Create Doctor entry linked to the new User and Hospital
        await addDoctor({
          userId: newUserId,
          hospitalId: user?.hospitalId, // ✅ Required by Doctor Entity
          specialization: formData.specialization,
        });

        toast.success("Doctor added successfully!");
        navigate("/doctor");
      }
    } catch (error: any) {
      // Improved error handling to show backend constraint messages
      const errorMsg = error.response?.data?.message || "Check console for DB constraints";
      toast.error(errorMsg);
      console.error("Submission Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <Card className="shadow-sm p-4 border-0">
        <h3 className="mb-4">Add New Doctor</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" required onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" required onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" name="email" required onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Specialization</Form.Label>
            <Form.Control 
              name="specialization" 
              placeholder="e.g. Yoga, Cardiology" 
              required 
              onChange={handleChange} 
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control name="mobile" required onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" required onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2 mt-3">
            <Button type="submit" variant="primary" className="px-4">Save Doctor</Button>
            <Button variant="outline-secondary" onClick={() => navigate("/doctor")}>Cancel</Button>
          </div>
        </Form>
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddDoctor;