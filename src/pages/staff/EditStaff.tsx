// src/pages/staff/EditStaff.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Card, Row, Col, Spinner } from "react-bootstrap";
import { getStaffDetail, updateStaff } from "../../api/staffApi";
import { updateUser } from "../../api/userApi";
import { toast, ToastContainer } from "react-toastify";

const EditStaff = () => {
  const { id } = useParams(); // This is the Staff ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    roleName: "", // This corresponds to the 'role' column in your Staff table
    userId: 0
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // We use the corrected API call with ?id=
        const res = await getStaffDetail(Number(id));
        const staffData = res.data.data;
        
        // Populate form using nested user data from your backend response
        setFormData({
          firstName: staffData.user.firstName,
          lastName: staffData.user.lastName,
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
      // 1. Update Core User Details (Names and Mobile)
      await updateUser(formData.userId, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.mobile
      });

      // 2. Update Staff-Specific Details (Designation/Role Name)
      await updateStaff(Number(id), {
        role: formData.roleName
      });

      toast.success("Staff details updated successfully!");
      // Short delay before navigation so user can see the success toast
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