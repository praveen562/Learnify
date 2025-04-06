import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Bell, 
  FileText, 
  Calendar, 
  CheckCircle, 
  Video,
  Users,
  Clock,
  ChevronRight,
  Play,
  AlertCircle,
  FolderOpen
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface LiveClass {
  id: number;
  subject: string;
  teacher: string;
  startTime: string;
  duration: string;
  status: 'upcoming' | 'live' | 'ended';
}

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted';
}

function StudentDashboard() {
  const navigate = useNavigate();
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([
    {
      id: 1,
      subject: 'Mathematics',
      teacher: 'Ms. Sarah Wilson',
      startTime: '09:00 AM',
      duration: '1 hour',
      status: 'live'
    },
    {
      id: 2,
      subject: 'Physics',
      teacher: 'Mr. Robert Brown',
      startTime: '11:00 AM',
      duration: '1 hour',
      status: 'upcoming'
    }
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: 'Algebra Practice Set',
      subject: 'Mathematics',
      dueDate: '2025-03-20',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      subject: 'Physics',
      dueDate: '2025-03-22',
      status: 'submitted'
    }
  ]);

  // Check for active live classes periodically
  useEffect(() => {
    const checkLiveClasses = () => {
      // In a real app, this would be an API call to check for active classes
      console.log('Checking for live classes...');
    };

    const interval = setInterval(checkLiveClasses, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const joinClass = (classId: number) => {
    navigate('/liveclass');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Student Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
              <div className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Student avatar"
                />
                <span className="text-sm font-medium text-gray-700">John Smith</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-indigo-50 rounded-lg p-3">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Courses</p>
                <p className="text-2xl font-semibold text-gray-900">6</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-purple-50 rounded-lg p-3">
                <CheckCircle className="h-6 w-6 text-purple-600" />
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
                <Video className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Live Classes</p>
                <p className="text-2xl font-semibold text-gray-900">2</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-yellow-50 rounded-lg p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Study Hours</p>
                <p className="text-2xl font-semibold text-gray-900">24.5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Live Classes */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Live Classes</h2>
                <Link 
                  to="/calendar"
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
                >
                  View Schedule
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                {liveClasses.map((liveClass) => (
                  <div key={liveClass.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        liveClass.status === 'live' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Video className={`h-5 w-5 ${
                          liveClass.status === 'live' ? 'text-green-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{liveClass.subject}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>{liveClass.teacher}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{liveClass.startTime}</p>
                        <p className="text-xs text-gray-500">{liveClass.duration}</p>
                      </div>
                      {liveClass.status === 'live' && (
                        <button
                          onClick={() => joinClass(liveClass.id)}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          <Play className="h-4 w-4" />
                          <span>Join Now</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources Quick Access */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Learning Resources</h2>
                <Link 
                  to="/resources"
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
                >
                  View All Resources
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/resources?type=pdf"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <FileText className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Study Materials</p>
                    <p className="text-sm text-gray-500">12 PDFs</p>
                  </div>
                </Link>
                <Link
                  to="/resources?type=video"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Video className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Video Lectures</p>
                    <p className="text-sm text-gray-500">8 Videos</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Assignments</h2>
                <Link 
                  to="/studenttasks"
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
                >
                  View All Tasks
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        assignment.status === 'submitted' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        <FileText className={`h-5 w-5 ${
                          assignment.status === 'submitted' ? 'text-green-600' : 'text-yellow-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{assignment.title}</p>
                        <p className="text-sm text-gray-500">{assignment.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                        <p className={`text-xs ${
                          assignment.status === 'submitted' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Progress Overview */}
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Course Progress</h2>
              </div>
              <div className="space-y-4">
                {[
                  { course: 'Mathematics', progress: 75 },
                  { course: 'Physics', progress: 60 },
                  { course: 'Chemistry', progress: 85 },
                ].map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">{course.course}</span>
                      <span className="text-sm text-gray-500">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div 
                        className="h-2 bg-indigo-600 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Notes */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Notes</h2>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Algebra Formulas', date: 'Mar 15, 2025', subject: 'Mathematics' },
                  { title: 'Newton\'s Laws', date: 'Mar 14, 2025', subject: 'Physics' },
                  { title: 'Chemical Reactions', date: 'Mar 13, 2025', subject: 'Chemistry' },
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;