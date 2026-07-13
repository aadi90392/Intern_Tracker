import { useState, useEffect, useContext } from 'react';
import { LogOut, Send, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import type { Task } from '../types';

const InternDashboard = () => {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({ taskTitle: '', description: '', githubLink: '', status: 'In Progress' });

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
    try {
      await api.post('/intern/task', form);
      alert('Task Logged!');
      setForm({ taskTitle: '', description: '', githubLink: '', status: 'In Progress' });
      fetchTasks(); // Refresh table
    } catch (err) {
      alert('Failed to submit task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Hi, {auth?.user?.name} 👋</h1>
        <button onClick={() => auth?.logout()} className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition">
          <LogOut size={20} /> Logout
        </button>
      </nav>

      <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Send size={20} className="text-indigo-600"/> Log Daily Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input className="w-full border rounded-lg p-3 text-sm outline-none focus:border-indigo-500" placeholder="Task Title" value={form.taskTitle} onChange={e => setForm({...form, taskTitle: e.target.value})} required />
              <textarea className="w-full border rounded-lg p-3 text-sm outline-none focus:border-indigo-500 h-24" placeholder="Description (optional)" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              <input className="w-full border rounded-lg p-3 text-sm outline-none focus:border-indigo-500" placeholder="GitHub Link (optional)" type="url" value={form.githubLink} onChange={e => setForm({...form, githubLink: e.target.value})} />
              <select className="w-full border rounded-lg p-3 text-sm outline-none focus:border-indigo-500" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition">Submit Report</button>
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100"><h2 className="text-lg font-bold">My Recent Tasks</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Task</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tasks.map((t) => (
                    <tr key={t._id} className="hover:bg-gray-50 transition">
                      <td className="p-4 text-gray-500">{new Date(t.date).toLocaleDateString()}</td>
                      <td className="p-4 font-medium text-gray-800">{t.taskTitle}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          t.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          t.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {t.status === 'Completed' && <CheckCircle2 size={14} />}
                          {t.status === 'In Progress' && <Clock size={14} />}
                          {t.status === 'Blocked' && <AlertCircle size={14} />}
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InternDashboard;