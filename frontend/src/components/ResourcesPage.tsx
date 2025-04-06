import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  Video, 
  Download, 
  Calendar, 
  BookOpen,
  Filter,
  ArrowLeft,
  Clock,
  Tag
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Resource {
  id: number;
  title: string;
  type: 'pdf' | 'video' | 'document';
  subject: string;
  date: string;
  size: string;
  downloadUrl: string;
}

function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const resources: Resource[] = [
    {
      id: 1,
      title: 'Introduction to Algebra',
      type: 'pdf',
      subject: 'Mathematics',
      date: '2025-03-15',
      size: '2.4 MB',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Newton\'s Laws of Motion',
      type: 'video',
      subject: 'Physics',
      date: '2025-03-14',
      size: '45.2 MB',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Chemical Reactions Guide',
      type: 'document',
      subject: 'Chemistry',
      date: '2025-03-13',
      size: '1.8 MB',
      downloadUrl: '#'
    },
    {
      id: 4,
      title: 'Quadratic Equations Practice',
      type: 'pdf',
      subject: 'Mathematics',
      date: '2025-03-12',
      size: '3.1 MB',
      downloadUrl: '#'
    },
    {
      id: 5,
      title: 'Lab Safety Guidelines',
      type: 'document',
      subject: 'Chemistry',
      date: '2025-03-11',
      size: '1.2 MB',
      downloadUrl: '#'
    }
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry'];
  const types = ['pdf', 'video', 'document'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-blue-600" />;
      case 'document':
        return <FileText className="h-5 w-5 text-green-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-50';
      case 'video':
        return 'bg-blue-50';
      case 'document':
        return 'bg-green-50';
      default:
        return 'bg-gray-50';
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
            <h1 className="text-xl font-semibold text-gray-900">Learning Resources</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search resources..."
                />
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  <option value="all">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                >
                  <option value="all">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${getResourceColor(resource.type)}`}>
                    {getResourceIcon(resource.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
                    <div className="mt-1 space-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Tag className="h-4 w-4 mr-1" />
                        {resource.subject}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(resource.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {resource.size}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <a
                  href={resource.downloadUrl}
                  className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ResourcesPage;