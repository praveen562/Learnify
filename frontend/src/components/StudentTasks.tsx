import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Calendar, 
  ArrowLeft,
  Filter,
  Tag,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
  description: string;
}

function StudentTasks() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete Mathematics Assignment',
      subject: 'Mathematics',
      dueDate: '2025-03-20',
      status: 'pending',
      priority: 'high',
      description: 'Chapter 4 exercises: 1-10'
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      subject: 'Physics',
      dueDate: '2025-03-22',
      status: 'pending',
      priority: 'medium',
      description: 'Write up findings from today\'s experiment'
    },
    {
      id: 3,
      title: 'Chemistry Quiz Preparation',
      subject: 'Chemistry',
      dueDate: '2025-03-18',
      status: 'completed',
      priority: 'high',
      description: 'Review chapters 5-7'
    }
  ]);

  const toggleTaskStatus = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'upcoming') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/studentdashboard" className="flex items-center text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">My Tasks</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
            </div>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'all' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'upcoming' 
                  ? 'bg-yellow-100 text-yellow-700' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'completed' 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div 
              key={task.id}
              className={`bg-white rounded-xl shadow-sm p-6 border ${
                task.status === 'completed' ? 'border-green-200' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`mt-1 p-1 rounded-full ${
                      task.status === 'completed' 
                        ? 'text-green-600 hover:text-green-700' 
                        : 'text-gray-400 hover:text-gray-500'
                    }`}
                  >
                    {task.status === 'completed' ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-current" />
                    )}
                  </button>
                  <div>
                    <h3 className={`text-lg font-medium ${
                      task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h3>
                    <div className="mt-1 space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Tag className="h-4 w-4" />
                        <span>{task.subject}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default StudentTasks;