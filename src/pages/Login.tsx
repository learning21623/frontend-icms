import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/user/login', {
        email,
        password,
      }, {
        withCredentials: true
      });

      const token = res.data?.data?.token;

      if (token) {
        localStorage.setItem('token', token);
        alert('Login successful');
        navigate('/dashboard'); // ✅ Make sure this route is defined
      } else {
        alert('Login failed: No token received');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert('Login failed: ' + (error.response?.data?.message || error.message));
      } else if (error instanceof Error) {
        alert('Login failed: ' + error.message);
      } else {
        alert('Login failed: An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      /><br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      /><br />
      <button onClick={handleLogin}>Login</button><br />
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;
