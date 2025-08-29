import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AuthLayout from "../../components/layout/AuthLayout";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile || !formData.password) {
        toast.error("Please fill all fields");
        return;
      }

      await axios.post("http://localhost:8000/api/user/add", {
        ...formData,
        role: "customer",
      });

      toast.success("Registration successful!");
      navigate("/");
    } catch (error: any) {
      toast.error("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <AuthLayout>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control name="firstName" placeholder="First Name" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control name="lastName" placeholder="Last Name" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile</Form.Label>
          <Form.Control name="mobile" placeholder="10-digit Mobile" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
        </Form.Group>

        <Button
          className="w-100"
          style={{ backgroundColor: "#d4af37", border: "none" }}
          onClick={handleRegister}
        >
          Register
        </Button>
      </Form>
      <p className="mt-3 text-center">
        Already have an account? <Link to="/">Login</Link>
      </p>
      <ToastContainer />
    </AuthLayout>
  );
};

export default Register;
