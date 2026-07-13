export interface User {
  id: string;
  name: string;
  role: 'admin' | 'intern';
}

export interface AuthResponse {
  token: string;
  role: 'admin' | 'intern';
  name: string;
}

export interface Task {
  _id: string;
  taskTitle: string;
  description?: string;
  githubLink?: string;
  status: 'Completed' | 'In Progress' | 'Blocked';
  date: string;
  internId?: {
    name: string;
    email: string;
  };
}