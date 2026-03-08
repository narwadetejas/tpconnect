import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (email: string, password: string, role: string) =>
    api.post('/auth/register', { email, password, role }),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
};

export const studentService = {
  createProfile: (data: any) => api.post('/students/', data),
  getMyProfile: () => api.get('/students/me'),
  updateProfile: (data: any) => api.put('/students/me', data),
  listStudents: () => api.get('/students/'),
};

export const companyService = {
  createProfile: (data: any) => api.post('/companies/', data),
  getMyCompany: () => api.get('/companies/me'),
  listCompanies: () => api.get('/companies/'),
};

export const jobService = {
  createJob: (data: any) => api.post('/jobs/', data),
  listJobs: () => api.get('/jobs/'),
  getJob: (id: number) => api.get(`/jobs/${id}`),
};

export const applicationService = {
  apply: (jobId: number) => api.post('/applications/', { job_id: jobId }),
  getMyApplications: () => api.get('/applications/my-applications'),
  getJobApplications: (jobId: number) => api.get(`/applications/job/${jobId}`),
  updateStatus: (id: number, status: string) =>
    api.put(`/applications/${id}/status?status=${status}`),
};

export const interviewService = {
  schedule: (data: any) => api.post('/interviews/', data),
  getMyInterviews: () => api.get('/interviews/my-interviews'),
  listAll: () => api.get('/interviews/'),
};

export const resultService = {
  publish: (data: any) => api.post('/results/', data),
  getMyResults: () => api.get('/results/my-results'),
  listAll: () => api.get('/results/'),
};

export default api;
