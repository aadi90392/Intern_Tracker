import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import type { AuthResponse } from '../types';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
      auth?.login(data.token, data.role, data.name);
      navigate(data.role === 'admin' ? '/admin' : '/intern');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <LogIn size={32} />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your dashboard</p>
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <input type="email" placeholder="Email Address" required className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" onChange={(e) => setPassword(e.target.value)} />
          
          <button type="submit" className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700">Sign In</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          New here? <Link to="/signup" className="font-semibold text-indigo-600 hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;