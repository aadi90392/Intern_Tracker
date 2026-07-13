import { useEffect, useState, useContext } from 'react';
import { LogOut } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { StatusStamp } from '../components/StatusStamp';
import type { Task } from '../types';

const AdminDashboard = () => {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [internForm, setInternForm] = useState({ name: '', email: '', password: '' });
  const [internMsg, setInternMsg] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    api.get('/admin/all-tasks')
      .then(res => setTasks(res.data.tasks))
      .catch(err => console.error(err));
  }, []);

  const handleAddIntern = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setInternMsg('');
    try {
      await api.post('/admin/add-intern', internForm);
      setInternMsg('Intern added.');
      setInternForm({ name: '', email: '', password: '' });
    } catch (err: any) {
      setInternMsg(err.response?.data?.error || 'Could not add intern.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b border-line px-6 py-4 flex justify-between items-center bg-ink text-paper">
        <div>
          <span className="font-display text-xs tracking-[0.2em] text-paper/50 uppercase block">Admin</span>
          <span className="font-display text-base font-semibold">{auth?.user?.name}</span>
        </div>
        <button onClick={() => auth?.logout()} className="flex items-center gap-2 text-sm font-display uppercase tracking-wider text-paper/60 hover:text-paper transition">
          <LogOut size={16} /> Sign out
        </button>
      </nav>

      <div className="max-w-6xl mx-auto p-6 md:p-10 grid md:grid-cols-5 gap-8">
        {/* Add intern */}
        <div className="md:col-span-2">
          <div className="border border-line bg-paper-raised">
            <div className="border-b border-line px-5 py-3 flex items-center gap-3">
              <span className="font-display text-[11px] tracking-[0.2em] text-accent uppercase">Register Intern</span>
              <div className="h-px flex-1 bg-line" />
            </div>
            <form onSubmit={handleAddIntern} className="p-5 space-y-4">
              <div>
                <label className="block font-display text-[11px] uppercase tracking-widest text-ink/50 mb-1.5">Full name</label>
                <input className="w-full border border-line px-3.5 py-2.5 text-sm font-body outline-none focus:border-accent focus:ring-1 focus:ring-accent transition" value={internForm.name} onChange={e => setInternForm({ ...internForm, name: e.target.value })} required />
              </div>
              <div>
                <label className="block font-display text-[11px] uppercase tracking-widest text-ink/50 mb-1.5">Email</label>
                <input type="email" className="w-full border border-line px-3.5 py-2.5 text-sm font-body outline-none focus:border-accent focus:ring-1 focus:ring-accent transition" value={internForm.email} onChange={e => setInternForm({ ...internForm, email: e.target.value })} required />
              </div>
              <div>
                <label className="block font-display text-[11px] uppercase tracking-widest text-ink/50 mb-1.5">Temporary password</label>
                <input type="password" minLength={6} className="w-full border border-line px-3.5 py-2.5 text-sm font-body outline-none focus:border-accent focus:ring-1 focus:ring-accent transition" value={internForm.password} onChange={e => setInternForm({ ...internForm, password: e.target.value })} required />
              </div>

              {internMsg && <p className="text-sm font-body text-ink/60">{internMsg}</p>}

              <button type="submit" disabled={adding} className="w-full bg-accent text-paper-raised py-2.5 font-display text-sm font-semibold uppercase tracking-wider hover:bg-ink transition disabled:opacity-50">
                {adding ? 'Adding…' : 'Add intern'}
              </button>
            </form>
          </div>
        </div>

        {/* Full ledger */}
        <div className="md:col-span-3">
          <div className="border border-line bg-paper-raised">
            <div className="border-b border-line px-5 py-3 flex items-center gap-3">
              <span className="font-display text-[11px] tracking-[0.2em] text-accent uppercase">All Entries</span>
              <div className="h-px flex-1 bg-line" />
              <span className="font-display text-[11px] text-ink/40">{tasks.length} logged</span>
            </div>

            <div className="divide-y divide-line max-h-[720px] overflow-y-auto">
              {tasks.map((t, i) => (
                <div key={t._id} className="px-5 py-4 flex gap-4 items-start">
                  <span className="font-display text-xs text-ink/30 pt-0.5 w-8 shrink-0">
                    {String(tasks.length - i).padStart(3, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="font-body font-medium text-sm truncate">{t.taskTitle}</span>
                      <StatusStamp status={t.status} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-ink/50 font-display flex-wrap">
                      <span className="font-semibold text-ink/70">{t.internId?.name || 'Deleted user'}</span>
                      <span>·</span>
                      <span>{new Date(t.date).toLocaleDateString()}</span>
                      {t.githubLink && (
                        <>
                          <span>·</span>
                          <a href={t.githubLink} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                            View link
                          </a>
                        </>
                      )}
                    </div>
                    {t.description && <p className="text-xs text-ink/50 font-body mt-1 line-clamp-1">{t.description}</p>}
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="px-5 py-12 text-center text-sm text-ink/40 font-body">
                  No entries logged yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;