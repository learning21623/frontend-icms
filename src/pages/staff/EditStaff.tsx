// src/pages/staff/EditStaff.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Card, Row, Col, Spinner } from "react-bootstrap";
import { getStaffDetail, updateStaff } from "../../api/staffApi";
import { updateUser } from "../../api/userApi";
import { toast, ToastContainer } from "react-toastify";

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",    // Added email to state
    mobile: "",
    roleName: "", 
    userId: 0
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getStaffDetail(Number(id));
        const staffData = res.data.data;
        
        setFormData({
          firstName: staffData.user.firstName,
          lastName: staffData.user.lastName,
          email: staffData.user.email, // Mapping email from nested user object
          mobile: staffData.user.mobile,
          roleName: staffData.role || "", 
          userId: staffData.userId
        });
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Error loading staff details");
        navigate("/staff");
      }
    };
    fetchDetails();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Update Core User Details
      await updateUser(formData.userId, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.mobile
      });

      // 2. Update Staff-Specific Details
      await updateStaff(Number(id), {
        role: formData.roleName
      });

      toast.success("Staff details updated successfully!");
      setTimeout(() => navigate("/staff"), 1500);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to update staff";
      toast.error(errorMsg);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-sm border-0">
        <h3 className="mb-4">Edit Staff Member</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  required
                  value={formData.firstName} 
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  required
                  value={formData.lastName} 
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
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
              Login email cannot be modified.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Staff Designation (Role Name)</Form.Label>
            <Form.Control 
              placeholder="e.g. Receptionist, Nurse"
              value={formData.roleName} 
              onChange={(e) => setFormData({...formData, roleName: e.target.value})} 
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control 
              required
              value={formData.mobile} 
              onChange={(e) => setFormData({...formData, mobile: e.target.value})} 
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary" className="px-4">
              Update Changes
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate("/staff")}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default EditStaff;