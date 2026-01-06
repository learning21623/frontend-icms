// src/pages/staff/AddStaff.tsx
import { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registerUser } from "../../api/userApi";
import { addStaff } from "../../api/staffApi";
import { useAuth } from "../../context/AuthContext";

const AddStaff = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", mobile: "", password: "", roleName: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Step 1: Create User with roleId: 4 (Staff)
      const userRes = await registerUser({
        ...formData,
        roleId: 4, 
        hospitalId: user?.hospitalId
      });

      const newUserId = userRes.data?.data?.id;

      if (newUserId) {
        // Step 2: Link to Staff Table
        await addStaff({
          userId: newUserId,
          hospitalId: user?.hospitalId,
          role: formData.roleName // Descriptive role like "Nurse" or "Receptionist"
        });

        toast.success("Staff member added!");
        navigate("/staff");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error adding staff");
    }
  };

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-sm border-0">
        <h3>Add New Staff Member</h3>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>First Name</Form.Label>
              <Form.Control required onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
            </Col>
            <Col md={6}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control required onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Staff Designation (Role Name)</Form.Label>
            <Form.Control placeholder="e.g. Head Nurse, Front Desk" onChange={(e) => setFormData({...formData, roleName: e.target.value})} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </Form.Group>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Label>Mobile</Form.Label>
              <Form.Control required onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
            </Col>
            <Col md={6}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </Col>
          </Row>
          <Button type="submit">Save Staff Member</Button>
          <Button variant="link" onClick={() => navigate("/staff")}>Cancel</Button>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default AddStaff;