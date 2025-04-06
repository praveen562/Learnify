import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  Calendar as CalendarIcon, 
  BookOpen, 
  FileText, 
  Users, 
  Clock, 
  Upload, 
  Play,
  ChevronRight,
  Bell,
  ListTodo,
  FolderOpen
} from 'lucide-react';

function TeacherDashboard() {
  const navigate = useNavigate();
  const [isLiveClassActive, setIsLiveClassActive] = useState(false);

  const startLiveClass = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          // Proceed with live class setup, such as showing video stream
          setIsLiveClassActive(true);
          navigate('/liveclass');
        })
        .catch((err) => {
          console.error("Error accessing media devices: ", err);
          alert("Could not start the live class. Please check your camera and microphone permissions.");
        });
    } else {
      console.error("getUserMedia not supported on this browser");
      alert("Your browser does not support video calls. Please use a compatible browser.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Teacher Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
                <span className="text-sm font-medium text-gray-700">Ms. Sarah Wilson</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-indigo-50 rounded-lg p-3">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-2xl font-semibold text-gray-900">156</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-purple-50 rounded-lg p-3">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Hours Taught</p>
                <p className="text-2xl font-semibold text-gray-900">24.5</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-pink-50 rounded-lg p-3">
                <FileText className="h-6 w-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Assignments</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-green-50 rounded-lg p-3">
                <Upload className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Materials</p>
                <p className="text-2xl font-semibold text-gray-900">45</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Start Live Class */}
            <div className={`bg-gradient-to-br ${isLiveClassActive ? 'from-green-500 to-emerald-600' : 'from-indigo-500 to-purple-600'} rounded-xl shadow-lg p-6 text-white`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Video className="h-8 w-8" />
                  <h2 className="text-xl font-semibold">
                    {isLiveClassActive ? 'Live Class in Progress' : 'Start Live Class'}
                  </h2>
                </div>
                <button
                  onClick={startLiveClass}
                  className="bg-white/20 hover:bg-white/30 transition-colors rounded-lg px-4 py-2 flex items-center space-x-2"
                >
                  <Play className="h-5 w-5" />
                  <span>{isLiveClassActive ? 'Resume Class' : 'Start Now'}</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-sm opacity-80">Current Class</p>
                  <p className="font-semibold">Mathematics 101</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-sm opacity-80">Students</p>
                  <p className="font-semibold">32 Enrolled</p>
                </div>
              </div>
              {isLiveClassActive && (
                <div className="mt-4 bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">Live for: 45:32</span>
                    </div>
                    <span className="text-sm">28 Students Active</span>
                  </div>
                </div>
              )}
            </div>

            {/* Task Management Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <ListTodo className="h-6 w-6 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Task Management</h2>
                </div>
                <button
                  onClick={() => navigate('/tasks')}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
                >
                  View All Tasks
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Grade Mathematics Assignments</p>
                    <p className="text-sm text-gray-500">Due in 2 days</p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    High Priority
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Prepare Physics Lab Materials</p>
                    <p className="text-sm text-gray-500">Due in 4 days</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    Medium Priority
                  </span>
                </div>
              </div>
            </div>

            {/* Calendar Preview */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-6 w-6 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
                </div>
                <button
                  onClick={() => navigate('/calendar')}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
                >
                  View Calendar
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <CalendarIcon className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Mathematics Test</p>
                      <p className="text-sm text-gray-500">March 15, 2025 • 09:00 AM</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Test
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <CalendarIcon className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Physics Assignment Due</p>
                      <p className="text-sm text-gray-500">March 20, 2025 • 11:59 PM</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    Assignment
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Resources Management */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Learning Resources</h2>
                <button
                  onClick={() => navigate('/resources')}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
                >
                  Manage Resources
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Documents</p>
                      <p className="text-sm text-gray-500">24 Files</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Video className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Videos</p>
                      <p className="text-sm text-gray-500">12 Files</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FolderOpen className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-900">Recent Uploads</p>
                      <p className="text-sm text-gray-500">Last 7 days</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-indigo-600">8 files</span>
                </div>
              </div>
            </div>

            {/* View Notes */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Notes</h2>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Lesson Plan - Week 12', date: 'Mar 15, 2025', subject: 'Mathematics' },
                  { title: 'Student Progress Notes', date: 'Mar 14, 2025', subject: 'General' },
                  { title: 'Lab Experiment Guide', date: 'Mar 13, 2025', subject: 'Physics' },
                ].map((note, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="bg-indigo-50 rounded-lg p-3">
                      <FileText className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{note.title}</p>
                      <p className="text-xs text-gray-500">{note.date} • {note.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Uploaded Materials */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Uploaded Materials</h2>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Chapter 4 Slides.pdf', size: '2.4 MB', type: 'PDF' },
                  { name: 'Practice Questions.docx', size: '1.8 MB', type: 'Document' },
                  { name: 'Video Tutorial.mp4', size: '45.2 MB', type: 'Video' },
                ].map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="bg-pink-50 rounded-lg p-2">
                        <Upload className="h-4 w-4 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.size} • {file.type}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-500">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TeacherDashboard;


