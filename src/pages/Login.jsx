import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = ({ onLogin, isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === 'true') {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      console.log('Login Response:', data);
      toast.success(data.message);
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('role', data.role);
      sessionStorage.setItem('user', JSON.stringify(data.user));

      if (onLogin) {
        onLogin(data.role);
      }

      navigate('/');
    } catch (error) {
      const message = error?.response?.data?.message || 'Login failed';
      toast.error(message);
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-200" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>
        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 border rounded-md"
          placeholder="you@example.com"
        />
        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-3 py-2 border rounded-md"
          placeholder="••••••••"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Log In</button>
      </form>
    </div>
  );
};

export default Login;