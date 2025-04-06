  import React from 'react';
  import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
  import { Brain, GraduationCap, Sparkles, ArrowRight, BookOpen, Users, Code } from 'lucide-react';
  import LoginPage from './components/LoginPage';
  import SignupPage from './components/SignupPage';
  import TeacherDashboard from './components/TeacherDashboard';
  import StudentDashboard from './components/StudentDashboard';
  import LiveClass from './components/LiveClass';
  import TaskManagement from './components/TaskManagement';
  import Calendar from './components/Calendar';
  import ResourcesPage from './components/ResourcesPage';
  import StudentTasks from './components/StudentTasks';

  function HomePage() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-10 border-b border-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  LearniFy
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-indigo-600 px-4 py-2">
                  Features
                </button>
                <button className="text-gray-600 hover:text-indigo-600 px-4 py-2">
                  About
                </button>
                <Link 
                  to="/signup" 
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Your AI Teaching
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Assistant
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Transform your classroom with AI-powered learning tools. Create personalized lessons, 
                generate assessments, and track student progress effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/login"
                  className="flex items-center justify-center px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Login
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Sign Up
                  <Sparkles className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mt-24 grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Lesson Plans</h3>
                <p className="text-gray-600">
                  Generate engaging lesson plans tailored to your teaching style and student needs.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Student Analytics</h3>
                <p className="text-gray-600">
                  Track progress and identify areas where students need additional support.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom Resources</h3>
                <p className="text-gray-600">
                  Create worksheets, quizzes, and interactive materials with AI assistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm border-y border-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">10,000+</div>
                <div className="text-gray-600">Active Teachers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">500,000+</div>
                <div className="text-gray-600">Lessons Generated</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">98%</div>
                <div className="text-gray-600">Teacher Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                LearniFy
              </span>
            </div>
            <div className="text-center text-gray-500 text-sm">
              © 2025 LearniFy. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  function App() {
    return (

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/liveclass" element={<LiveClass />} />
          <Route path="/tasks" element={<TaskManagement />} />
          <Route path="/studenttasks" element={<StudentTasks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>

    );
  }

  export default App;