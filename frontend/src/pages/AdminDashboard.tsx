import { useEffect, useState, useContext } from 'react';
import { LogOut, Users, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import type { Task } from '../types';

const AdminDashboard = () => {
  const auth = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.get('/admin/all-tasks')
      .then(res => setTasks(res.data.tasks))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-900 shadow-sm px-8 py-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <Users size={24} />
          <h1 className="text-xl font-bold">Admin Portal</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-indigo-200">Welcome, {auth?.user?.name}</span>
          <button onClick={() => auth?.logout()} className="flex items-center gap-2 hover:text-red-400 transition">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">All Intern Logs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Intern Name</th>
                  <th className="p-4 font-semibold">Task Description</th>
                  <th className="p-4 font-semibold">Link</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tasks.map((t) => (
                  <tr key={t._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 text-gray-500 whitespace-nowrap">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="p-4 font-medium text-gray-900">{t.internId?.name || "Deleted User"}</td>
                    <td className="p-4 text-gray-700">
                      <p className="font-medium">{t.taskTitle}</p>
                      {t.description && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{t.description}</p>}
                    </td>
                    <td className="p-4">
                      {t.githubLink ? (
                        <a href={t.githubLink} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">View</a>
                      ) : <span className="text-gray-400">-</span>}
                    </td>
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
                {tasks.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-gray-500">No tasks logged yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;