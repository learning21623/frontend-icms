import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    role: 'customer', // default role expected by backend
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      // Check basic client-side validation
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile || !formData.password) {
        alert('Please fill in all fields.');
        return;
      }
      if (formData.firstName.length < 2 || formData.lastName.length < 2) {
  alert("First and Last name must be at least 2 characters.");
  return;
}

      if (!/^\d{10}$/.test(formData.mobile)) {
        alert('Mobile number must be exactly 10 digits.');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/user/add', formData);
      alert('Registration successful!');
      console.log(response.data);
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      alert('Registration failed. Please check the data and try again.');
    }
  };

  // For testing: sends working hardcoded data
  const testRegister = async () => {
    try {
      const testData = {
        firstName: "Hariom",
        lastName: "Verma",
        email: "hariomveyet@example.com",
        mobile: "9999996797",
        password: "SecurePass123",
        role: 'customer',
      };
      const response = await axios.post('http://localhost:8000/api/user/add', testData);
      alert('Test Registration successful!');
      console.log('Test Response:', response.data);
    } catch (error: any) {
      console.error('Test Registration error:', error.response?.data || error.message);
      alert('Test Registration failed!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Register</h2>

      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      /><br />

      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      /><br />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      /><br />

      <input
        name="mobile"
        placeholder="Mobile (10 digits)"
        value={formData.mobile}
        onChange={handleChange}
      /><br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      /><br />

      <button onClick={handleRegister}>Register</button>
      <hr />
      <button onClick={testRegister}>Test Register (Hardcoded Data)</button>
    </div>
  );
};

export default Register;
