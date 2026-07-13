import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import api from '../api/axios';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'intern' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', formData);
      alert('Account created successfully! Please login.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <UserPlus size={32} />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Join the Intern Tracker platform</p>
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-5">
          <input type="text" placeholder="Full Name" required className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="email" placeholder="Email Address" required className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="password" placeholder="Password (min 6 chars)" required className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          
          <select className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" onChange={(e) => setFormData({ ...formData, role: e.target.value })} value={formData.role}>
            <option value="intern">Intern</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700">Sign Up</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-semibold text-indigo-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;