import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "../../components/layout/AuthLayout";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8001/api/user/login",
        { email, password },
        { withCredentials: true }
      );

      const token = res.data?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Login failed: No token received");
      }
    } catch (error: any) {
      toast.error("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <AuthLayout>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          className="w-100"
          style={{ backgroundColor: "#d4af37", border: "none" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Form>
      <p className="mt-3 text-center">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
      <ToastContainer />
    </AuthLayout>
  );
};

export default Login;
