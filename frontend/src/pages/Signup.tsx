import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/signup', formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="border-b border-line px-6 py-4">
        <span className="font-display text-xs tracking-[0.2em] text-ink/60 uppercase">
          BlueBricks / Intern Tracker
        </span>
      </header>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-display text-[11px] tracking-[0.25em] text-accent uppercase border border-accent px-2 py-1">
              New Record
            </span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <h1 className="font-display text-2xl font-semibold mb-1">Create account</h1>
          <p className="text-sm text-ink/60 mb-8 font-body">Registers you as an intern. Admin access is granted separately.</p>

          {error && (
            <div className="mb-5 border-l-2 border-stamp-blocked bg-stamp-blocked-soft px-3 py-2 text-sm text-stamp-blocked font-body">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block font-display text-[11px] uppercase tracking-widest text-ink/50 mb-1.5">Full name</label>
              <input type="text" required className="w-full border border-line bg-paper-raised px-3.5 py-2.5 text-sm font-body outline-none focus:border-accent focus:ring-1 focus:ring-accent transition" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <label className="block font-display text-[11px] uppercase tracking-widest text-ink/50 mb-1.5">Email</label>
              <input type="email" required className="w-full border border-line bg-paper-raised px-3.5 py-2.5 text-sm font-body outline-none focus:border-accent focus:ring-1 focus:ring-accent transition" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label className="block font-display text-[11px] uppercase tracking-widest text-ink/50 mb-1.5">Password</label>
              <input type="password" required minLength={6} className="w-full border border-line bg-paper-raised px-3.5 py-2.5 text-sm font-body outline-none focus:border-accent focus:ring-1 focus:ring-accent transition" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <p className="mt-1 text-xs text-ink/40 font-body">Minimum 6 characters.</p>
            </div>

            <button type="submit" className="w-full bg-accent text-paper-raised py-2.5 font-display text-sm font-semibold uppercase tracking-wider hover:bg-ink transition">
              Create account
            </button>
          </form>

          <p className="mt-8 text-sm text-ink/60 font-body">
            Already registered? <Link to="/login" className="text-accent font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;