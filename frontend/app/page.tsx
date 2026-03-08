'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <nav className="border-b border-white/20 bg-white/10 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <span className="text-4xl">🎓</span> TPConnect
          </h1>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white/20">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
            ✨ Welcome to the Future of Campus Placements
          </div>
          <h2 className="text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
            Training & Placement<br/>Connect
          </h2>
          <p className="text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Streamline your college placement process with our comprehensive management portal
          </p>
          <Link href="/register">
            <Button size="lg" className="text-xl px-12 py-8 bg-white text-purple-600 hover:bg-gray-100 font-bold shadow-2xl hover:scale-105 transition-transform">
              🚀 Start Your Journey
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
            <CardHeader>
              <div className="text-5xl mb-4">👨‍🎓</div>
              <CardTitle className="text-2xl text-purple-600">For Students</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Create professional profiles</li>
                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Apply for jobs & internships</li>
                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Track application status</li>
                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> View interview schedules</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
            <CardHeader>
              <div className="text-5xl mb-4">💼</div>
              <CardTitle className="text-2xl text-purple-600">For Recruiters</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Post job opportunities</li>
                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> View qualified candidates</li>
                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Shortlist applicants</li>
                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Manage hiring process</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
            <CardHeader>
              <div className="text-5xl mb-4">⚙️</div>
              <CardTitle className="text-2xl text-purple-600">For Admins</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Manage students & companies</li>
                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Schedule interviews</li>
                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Publish results</li>
                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Analytics dashboard</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
