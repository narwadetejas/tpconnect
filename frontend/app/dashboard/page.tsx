'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { studentService, companyService, jobService, applicationService, interviewService } from '@/services/api';

export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (!token) {
      router.push('/login');
    } else {
      setRole(userRole);
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <div className="text-white text-2xl">⏳ Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-200 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            🎓 TPConnect
          </h1>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold capitalize shadow-lg">
              {role === 'student' ? '👨🎓' : role === 'recruiter' ? '💼' : '⚙️'} {role}
            </span>
            <Button 
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold shadow-lg"
            >
              🚪 Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {role === 'student' && <StudentDashboard />}
        {role === 'admin' && <AdminDashboard />}
        {role === 'recruiter' && <RecruiterDashboard />}
      </main>
    </div>
  );
}

function StudentDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', branch: '', cgpa: '', skills: '', resume_url: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const profileRes = await studentService.getMyProfile();
      setProfile(profileRes.data);
    } catch (err) {
      setShowProfileForm(true);
    }

    try {
      const jobsRes = await jobService.listJobs();
      setJobs(jobsRes.data);
      const appsRes = await applicationService.getMyApplications();
      setApplications(appsRes.data);
      const interviewsRes = await interviewService.getMyInterviews();
      setInterviews(interviewsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await studentService.createProfile({ ...formData, cgpa: parseFloat(formData.cgpa) });
      setShowProfileForm(false);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleApply = async (jobId: number) => {
    try {
      await applicationService.apply(jobId);
      alert('✅ Application submitted successfully!');
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to apply');
    }
  };

  if (showProfileForm) {
    return (
      <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl flex items-center gap-2">👨🎓 Create Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleCreateProfile} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Full Name</label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                required 
                className="h-12"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Branch/Department</label>
              <Input 
                value={formData.branch} 
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })} 
                className="h-12"
                placeholder="Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">CGPA</label>
              <Input 
                type="number" 
                step="0.01" 
                value={formData.cgpa} 
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })} 
                className="h-12"
                placeholder="8.5"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Skills</label>
              <Input 
                value={formData.skills} 
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })} 
                placeholder="Python, Java, React, Node.js" 
                className="h-12"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Resume URL</label>
              <Input 
                value={formData.resume_url} 
                onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })} 
                placeholder="https://drive.google.com/..."
                className="h-12"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold shadow-lg"
            >
              🚀 Create Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">👋 Welcome, {profile?.name || 'Student'}!</CardTitle>
        </CardHeader>
        <CardContent>
          {profile && (
            <div className="grid md:grid-cols-2 gap-4 text-white/90">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-80">Branch</p>
                <p className="text-xl font-bold">{profile.branch}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-80">CGPA</p>
                <p className="text-xl font-bold">{profile.cgpa}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:col-span-2">
                <p className="text-sm opacity-80">Skills</p>
                <p className="text-lg font-semibold">{profile.skills}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow">
          <CardContent className="pt-6 text-center">
            <div className="text-5xl mb-2">💼</div>
            <p className="text-3xl font-bold text-blue-600">{jobs.length}</p>
            <p className="text-gray-600 font-medium">Available Jobs</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow">
          <CardContent className="pt-6 text-center">
            <div className="text-5xl mb-2">📝</div>
            <p className="text-3xl font-bold text-purple-600">{applications.length}</p>
            <p className="text-gray-600 font-medium">My Applications</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow">
          <CardContent className="pt-6 text-center">
            <div className="text-5xl mb-2">💬</div>
            <p className="text-3xl font-bold text-pink-600">{interviews.length}</p>
            <p className="text-gray-600 font-medium">Interviews</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <CardTitle className="text-2xl flex items-center gap-2">💼 Available Jobs</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No jobs available at the moment</p>
            ) : (
              jobs.map((job) => (
                <div key={job.id} className="border-2 border-purple-100 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all bg-gradient-to-r from-white to-purple-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-800">{job.title}</h3>
                      <p className="text-purple-600 font-semibold mt-1">🏢 {job.company?.name || 'Company'}</p>
                      <p className="text-gray-600 mt-3">{job.description}</p>
                      <div className="flex gap-4 mt-4">
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          💰 {job.salary}
                        </span>
                        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold capitalize">
                          {job.job_type?.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleApply(job.id)} 
                      className="ml-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    >
                      ✅ Apply Now
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="text-2xl flex items-center gap-2">📝 My Applications</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {applications.length === 0 ? (
              <p className="text-center text-gray-500 py-8">You haven't applied to any jobs yet</p>
            ) : (
              applications.map((app) => (
                <div key={app.id} className="flex justify-between items-center border-2 border-gray-100 rounded-lg p-4 hover:border-purple-200 hover:shadow-md transition-all">
                  <div>
                    <p className="font-bold text-lg text-gray-800">{app.job?.title}</p>
                    <p className="text-purple-600 font-medium">{app.job?.company?.name}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    app.status === 'selected' ? 'bg-green-100 text-green-700' :
                    app.status === 'shortlisted' ? 'bg-blue-100 text-blue-700' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {app.status === 'selected' ? '✅' : app.status === 'shortlisted' ? '👍' : app.status === 'rejected' ? '❌' : '⏳'} {app.status.toUpperCase()}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b">
          <CardTitle className="text-2xl flex items-center gap-2">💬 Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {interviews.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No interviews scheduled</p>
            ) : (
              interviews.map((interview) => (
                <div key={interview.id} className="border-2 border-pink-100 rounded-lg p-5 hover:border-pink-300 hover:shadow-md transition-all bg-gradient-to-r from-white to-pink-50">
                  <p className="font-bold text-lg text-gray-800">🎯 Round: {interview.round}</p>
                  <p className="text-gray-600 mt-2">📅 {new Date(interview.date).toLocaleString()}</p>
                  <p className="text-gray-600">📍 {interview.location}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const studentsRes = await studentService.listStudents();
      setStudents(studentsRes.data);
      const companiesRes = await companyService.listCompanies();
      setCompanies(companiesRes.data);
      const jobsRes = await jobService.listJobs();
      setJobs(jobsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">⚙️ Admin Dashboard</CardTitle>
          <p className="text-white/80">Manage students, companies, and placements</p>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:scale-105 transition-transform">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-3">👨🎓</div>
            <p className="text-5xl font-bold mb-2">{students.length}</p>
            <p className="text-xl font-semibold">Total Students</p>
          </CardContent>
        </Card>
        <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:scale-105 transition-transform">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-3">🏢</div>
            <p className="text-5xl font-bold mb-2">{companies.length}</p>
            <p className="text-xl font-semibold">Total Companies</p>
          </CardContent>
        </Card>
        <Card className="shadow-xl border-0 bg-gradient-to-br from-pink-500 to-pink-600 text-white hover:scale-105 transition-transform">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-3">💼</div>
            <p className="text-5xl font-bold mb-2">{jobs.length}</p>
            <p className="text-xl font-semibold">Active Jobs</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <CardTitle className="text-2xl flex items-center gap-2">👨🎓 Students List</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {students.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No students registered yet</p>
            ) : (
              students.map((student) => (
                <div key={student.id} className="flex justify-between items-center border-2 border-blue-100 rounded-lg p-5 hover:border-blue-300 hover:shadow-lg transition-all bg-gradient-to-r from-white to-blue-50">
                  <div className="flex-1">
                    <p className="font-bold text-xl text-gray-800">{student.name}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-purple-600 font-semibold">🎯 {student.branch}</span>
                      <span className="text-green-600 font-semibold">🎓 CGPA: {student.cgpa}</span>
                    </div>
                    <p className="text-gray-600 mt-2">🛠️ {student.skills}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="text-2xl flex items-center gap-2">🏢 Companies List</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {companies.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No companies registered yet</p>
            ) : (
              companies.map((company) => (
                <div key={company.id} className="border-2 border-purple-100 rounded-lg p-5 hover:border-purple-300 hover:shadow-lg transition-all bg-gradient-to-r from-white to-purple-50">
                  <p className="font-bold text-xl text-gray-800">{company.name}</p>
                  <p className="text-purple-600 font-semibold mt-2">📍 {company.location}</p>
                  <p className="text-gray-600 mt-2">{company.description}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b">
          <CardTitle className="text-2xl flex items-center gap-2">💼 All Job Postings</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {jobs.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No jobs posted yet</p>
            ) : (
              jobs.map((job) => (
                <div key={job.id} className="border-2 border-pink-100 rounded-lg p-5 hover:border-pink-300 hover:shadow-lg transition-all bg-gradient-to-r from-white to-pink-50">
                  <h3 className="font-bold text-xl text-gray-800">{job.title}</h3>
                  <p className="text-purple-600 font-semibold mt-1">🏢 {job.company?.name}</p>
                  <p className="text-gray-600 mt-3">{job.description}</p>
                  <div className="flex gap-3 mt-4">
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      💰 {job.salary}
                    </span>
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold capitalize">
                      {job.job_type?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RecruiterDashboard() {
  const [company, setCompany] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [companyData, setCompanyData] = useState({ name: '', description: '', location: '' });
  const [jobData, setJobData] = useState({ title: '', description: '', salary: '', job_type: 'full_time' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const companyRes = await companyService.getMyCompany();
      setCompany(companyRes.data);
      const jobsRes = await jobService.listJobs();
      setJobs(jobsRes.data);
    } catch (err) {
      setShowCompanyForm(true);
    }
  };

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await companyService.createProfile(companyData);
      setShowCompanyForm(false);
      alert('✅ Company profile created successfully!');
      loadData();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to create company profile');
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await jobService.createJob(jobData);
      setShowJobForm(false);
      setJobData({ title: '', description: '', salary: '', job_type: 'full_time' });
      alert('✅ Job posted successfully!');
      loadData();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to post job');
    }
  };

  if (showCompanyForm) {
    return (
      <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl flex items-center gap-2">🏢 Create Company Profile</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleCreateCompany} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Company Name</label>
              <Input 
                value={companyData.name} 
                onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })} 
                required 
                className="h-12"
                placeholder="Tech Corp Inc."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
              <Input 
                value={companyData.description} 
                onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })} 
                className="h-12"
                placeholder="Leading technology company..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Location</label>
              <Input 
                value={companyData.location} 
                onChange={(e) => setCompanyData({ ...companyData, location: e.target.value })} 
                className="h-12"
                placeholder="San Francisco, CA"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg font-semibold shadow-lg"
            >
              🚀 Create Company
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">💼 Recruiter Dashboard</CardTitle>
          <p className="text-white/80">Manage your company and job postings</p>
        </CardHeader>
      </Card>

      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="text-2xl flex items-center gap-2">🏢 Company Profile</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {company && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">{company.name}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  <p className="text-lg text-gray-700 font-semibold">{company.location}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-2xl">📝</span>
                  <p className="text-gray-600">{company.description}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl flex items-center gap-2">💼 Job Postings</CardTitle>
            <Button 
              onClick={() => setShowJobForm(!showJobForm)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg font-semibold"
            >
              {showJobForm ? '❌ Cancel' : '➕ Post New Job'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {showJobForm && (
            <form onSubmit={handleCreateJob} className="space-y-5 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">✨ Create New Job Posting</h3>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Job Title</label>
                <Input 
                  value={jobData.title} 
                  onChange={(e) => setJobData({ ...jobData, title: e.target.value })} 
                  required 
                  className="h-12"
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
                <Input 
                  value={jobData.description} 
                  onChange={(e) => setJobData({ ...jobData, description: e.target.value })} 
                  className="h-12"
                  placeholder="Full-stack developer position..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Salary</label>
                <Input 
                  value={jobData.salary} 
                  onChange={(e) => setJobData({ ...jobData, salary: e.target.value })} 
                  className="h-12"
                  placeholder="$100,000 - $120,000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Job Type</label>
                <select
                  value={jobData.job_type}
                  onChange={(e) => setJobData({ ...jobData, job_type: e.target.value })}
                  className="flex h-12 w-full rounded-md border border-input bg-white px-4 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <option value="full_time">💼 Full Time</option>
                  <option value="internship">🎓 Internship</option>
                </select>
              </div>
              <Button 
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold shadow-lg"
              >
                🚀 Post Job
              </Button>
            </form>
          )}

          <div className="space-y-4">
            {jobs.filter(j => j.company_id === company?.id).length === 0 ? (
              <p className="text-center text-gray-500 py-8">No jobs posted yet. Click "Post New Job" to get started!</p>
            ) : (
              jobs.filter(j => j.company_id === company?.id).map((job) => (
                <div key={job.id} className="border-2 border-purple-100 rounded-xl p-6 hover:border-purple-300 hover:shadow-xl transition-all bg-gradient-to-r from-white to-purple-50">
                  <h3 className="font-bold text-2xl text-gray-800">{job.title}</h3>
                  <p className="text-gray-600 mt-3 text-lg">{job.description}</p>
                  <div className="flex gap-3 mt-4">
                    <span className="px-5 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      💰 {job.salary}
                    </span>
                    <span className="px-5 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold capitalize">
                      {job.job_type?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
