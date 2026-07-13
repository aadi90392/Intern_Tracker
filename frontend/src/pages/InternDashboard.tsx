import { useState, useEffect, useContext } from 'react';
import { LogOut } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { StatusStamp } from '../components/StatusStamp';
import type { Task } from '../types';

const today = () => new Date().toISOString().slice(0, 10);

const InternDashboard = () => {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    taskTitle: '',
    description: '',
    githubLink: '',
    status: 'In Progress' as 'Completed' | 'In Progress' | 'Blocked',
    date: today(),
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await api.get('/intern/tasks');
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback('');
    try {
      await api.post('/intern/task', form);
      setFeedback('Entry logged.');
      setForm({ taskTitle: '', description: '', githubLink: '', status: 'In Progress', date: today() });
      fetchTasks();
    } catch (err) {
      setFeedback('Could not log entry. Check the form and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <nav className="border-b border-line px-6 py-4 flex justify-between items-center bg-paper-raised">
        <div>
          <span className="font-display text-xs tracking-[0.2em] text-ink/50 uppercase block">Intern Log</span>
          <span className="font-display text-base font-semibold">{auth?.user?.name}</span>
        </div>
        <button onClick={() => auth?.logout()} className="flex items-center gap-2 text-sm font-display uppercase tracking-wider text-ink/50 hover:text-stamp-blocked transition">
          <LogOut size={16} /> Sign out
        </button>
      </nav>

      <div className="max-w-5xl mx-auto p-6 md:p-10 grid md:grid-cols-5 gap-8">
        {/* Entry form */}
        <div className="md:col-span-2">
          <div className="border border-line bg-paper-raised">
            <div className="border-b border-line px-5 py-3 flex items-center gap-3">
              <span className="font-display text-[11px] tracking-[0.2em] text-accent uppercase">New Entry</span>
              <div className="h-px flex-1 bg-line" />
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block font-display text-[11px] uppercase tracking-widest text-ink/50 mb-1.5">Date</label>
                <input
                  type="date"
                  required
                  max={today()}
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-line px-3.5 py-2.5 text-sm font-body outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
                />
              </div>
              <div>
                <label className="block font-display text-[11px] uppercase tracking-widest text-ink/50 mb-1.5">Task title</label>
                <input
                  className="w-full border border-line px-3.5 py-2.5 text-sm font-body outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
                  placeholder="What did you work on?"
                  value={form.taskTitle}
                  onChange={e => setForm({ ...form, taskTitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block font-display text-[11px] uppercase tracking-widest text-ink/50 mb-1.5">Description</label>
                <textarea
                  className="w-full border border-line px-3.5 py-2.5 text-sm font-body outline-none focus:border-accent focus:ring-1 focus:ring-accent transition h-20 resize-none"
                  placeholder="Optional detail"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-display text-[11px] uppercase tracking-widest text-ink/50 mb-1.5">GitHub link</label>
                <input
                  type="url"
                  className="w-full border border-line px-3.5 py-2.5 text-sm font-body outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
                  placeholder="Optional"
                  value={form.githubLink}
                  onChange={e => setForm({ ...form, githubLink: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-display text-[11px] uppercase tracking-widest text-ink/50 mb-1.5">Status</label>
                <select
                  className="w-full border border-line px-3.5 py-2.5 text-sm font-body outline-none focus:border-accent focus:ring-1 focus:ring-accent transition bg-paper-raised"
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value as typeof form.status })}
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              {feedback && <p className="text-sm font-body text-ink/60">{feedback}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent text-paper-raised py-2.5 font-display text-sm font-semibold uppercase tracking-wider hover:bg-ink transition disabled:opacity-50"
              >
                {submitting ? 'Logging…' : 'Log entry'}
              </button>
            </form>
          </div>
        </div>

        {/* Ledger */}
        <div className="md:col-span-3">
          <div className="border border-line bg-paper-raised">
            <div className="border-b border-line px-5 py-3 flex items-center gap-3">
              <span className="font-display text-[11px] tracking-[0.2em] text-accent uppercase">Your Record</span>
              <div className="h-px flex-1 bg-line" />
              <span className="font-display text-[11px] text-ink/40">{tasks.length} entries</span>
            </div>

            <div className="divide-y divide-line">
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
                    <div className="flex items-center gap-3 text-xs text-ink/50 font-display">
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
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="px-5 py-12 text-center text-sm text-ink/40 font-body">
                  No entries yet — log your first task to the left.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InternDashboard;