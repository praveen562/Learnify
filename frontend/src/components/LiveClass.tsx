import React, { useState, useRef, useEffect } from 'react';

import { 
  Video,
  VideoOff,
  Mic,
  MicOff,
  Play,
  Pause,
  Square,
  Users,
  MessageSquare,
  ListTodo,
  Clock,
  X,
  Maximize2,
  Settings,
  Share2,
  Camera
} from 'lucide-react';

function LiveClass() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [cameraPermission, setCameraPermission] = useState<PermissionState | null>(null);
  const [transcription, setTranscription] = useState<string[]>([ /* Initial transcription texts (will be updated) */ ]);
  const [detectedTasks, setDetectedTasks] = useState<any[]>([]); // Initially no tasks
  const videoRef = useRef<HTMLVideoElement>(null);

  const [elapsedTime, setElapsedTime] = useState(0); // Elapsed time for the timer
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showDownloadables, setShowDownloadables] = useState(false);

  const pdfFileName = "06-04-2025-ml-summarized-notes.pdf";
  const videoFileName = "06-04-2025-ml-session.mp4";


  // Check camera permissions on component mount
  useEffect(() => {
    navigator.permissions.query({ name: 'camera' as PermissionName })
      .then(permissionStatus => {
        setCameraPermission(permissionStatus.state);
        permissionStatus.onchange = () => {
          setCameraPermission(permissionStatus.state);
        };
      });
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let taskTimer: NodeJS.Timeout | null = null;
    
    if (isTimerRunning) {
      timer = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);

      if (elapsedTime === 10) {
        setTranscription((prev) => [
          ...prev,
          "Good morning students. Today in machine learning class, we are going to learn various types of machine learning algorithms along with their flow diagram."
        ]);
      }
      if (elapsedTime === 20) {
        setTranscription((prev) => [
          ...prev,
          "The various types of machine learning algorithms are supervised learning, unsupervised learning, reinforcement learning, semi-supervised learning."
        ]);
      }
      if (elapsedTime === 30) {
        setTranscription((prev) => [
          ...prev,
          "The deadline for the submission of Assignment 3 is April 8. Be sure to submit it on time. ML test in next class"
        ]);

        setDetectedTasks((prevTasks) => [
          ...prevTasks,
          { type: 'assignment', text: 'Assignment 3 due by April 8', time: '3 sec ago' },
          { type: 'quiz', text: 'ML test in next class', time: '2 sec ago' }
        ]);
      }
      
    } else {
      if (timer) clearInterval(timer);
      if (taskTimer) clearInterval(taskTimer);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (taskTimer) clearInterval(taskTimer);
    };
  }, [isTimerRunning, elapsedTime]);


  useEffect(() => {
    const videoElement = videoRef.current;
    if (isCameraOn && videoElement && cameraPermission !== 'denied') {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoElement.srcObject = stream;
        })
        .catch((err) => {
          console.error("Failed to access camera:", err);
          setIsCameraOn(false);
        });
    } else {
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;
      }
    }

    return () => {
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn, cameraPermission]);


  // Camera permissions and video logic
  useEffect(() => {
    const videoElement = videoRef.current;
    if (isCameraOn && videoElement && cameraPermission !== 'denied') {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoElement.srcObject = stream;
        })
        .catch((err) => {
          console.error("Failed to access camera:", err);
          setIsCameraOn(false);
        });
    } else {
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;
      }
    }

    return () => {
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn, cameraPermission]);

  // Function to format elapsed time in HH:MM:SS format
  const formatTime = (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  // Start/Stop recording
  const toggleRecording = () => {
    if (isPaused) {
      setIsPaused(false);
    }
    setIsRecording(!isRecording);
    setIsTimerRunning(true); // Start the timer when recording starts
  };

  // Pause/Resume recording
  const togglePause = () => {
    setIsPaused(!isPaused);
    setIsTimerRunning(!isTimerRunning); // Pause the timer when paused
  };


  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setIsTimerRunning(false);
    setElapsedTime(0); // Reset the timer when recording stops
    // Show the PDF and video after stopping the recording
    setShowDownloadables(true); // New state to control visibility
  };
  

  const renderCameraPermissionMessage = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-white p-8 text-center rounded-2xl">
      <Camera className="h-16 w-16 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Camera Access Required</h3>
      <p className="text-gray-300 mb-4">
        To participate in the live class, please enable camera access in your browser settings.
      </p>
      <div className="bg-gray-700 p-4 rounded-lg text-sm text-gray-300 max-w-md">
        <p className="font-medium mb-2">How to enable camera access:</p>
        <ol className="list-decimal list-inside text-left space-y-1">
          <li>Click the camera icon in your browser's address bar</li>
          <li>Select "Allow" for camera access</li>
          <li>Refresh the page</li>
        </ol>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                <span className="font-semibold text-gray-900">Live Class</span>
              </div>
              <span className="text-sm text-gray-500">Duration: {formatTime(elapsedTime)}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-50 rounded-lg px-3 py-1 flex items-center">
                <Users className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium">0 Students</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Share2 className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Maximize2 className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-16 flex h-[calc(100vh-4rem)]">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Video Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Container */}
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video shadow-lg">
                {cameraPermission === 'denied' ? (
                  renderCameraPermissionMessage()
                ) : isCameraOn ? (
                  <div onClick={() => setIsCameraOn(false)} className="w-full h-full cursor-pointer">
                    <video 
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      playsInline 
                    />
                  </div>
                ) : (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={() => setIsCameraOn(true)}
                  >
                    <VideoOff className="h-16 w-16 text-gray-500" />
                  </div>
                )}
                
                {/* Video Controls */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center justify-center space-x-4">
                    <button 
                      onClick={() => setIsCameraOn(!isCameraOn)}
                      className={`p-3 rounded-full ${isCameraOn ? 'bg-white text-gray-900' : 'bg-red-500 text-white'}`}
                      disabled={cameraPermission === 'denied'}
                    >
                      {isCameraOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                    </button>
                    <div 
                      onClick={() => setIsMicOn(!isMicOn)} 
                      className={`p-3 rounded-full cursor-pointer ${isMicOn ? 'bg-white text-gray-900' : 'bg-red-500 text-white'}`}
                    >
                      {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                    </div>
                    <button 
                        onClick={isRecording ? togglePause : toggleRecording}
                        className={`p-3 rounded-full ${isRecording ? 'bg-yellow-500' : 'bg-red-500'} text-white`}
                      >
                        {!isRecording ? (
                          <Play className="h-6 w-6" />
                        ) : isPaused ? (
                          <Play className="h-6 w-6" />
                        ) : (
                          <Pause className="h-6 w-6" />
                        )}
                      </button>
                      
                      {/* Stop Recording Button */}
                      {isRecording && !isPaused && (
                        <button 
                          onClick={stopRecording}
                          className="p-3 rounded-full bg-gray-600 text-white"
                        >
                          <Square className="h-6 w-6" />
                        </button>
                                      )}
                  </div>
                </div>
              </div>

              {/* Transcription Area */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Live Transcription</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Auto-scrolling</span>
                    <div className="w-8 h-4 bg-indigo-600 rounded-full"></div>
                  </div>
                </div>
                <div className="h-48 overflow-y-auto space-y-3">
                  {transcription.map((text, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-xs text-gray-400 mt-1">00:{index + 1}0</span>
                      <p className="text-gray-700">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Detected Tasks</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Clear All
                </button>
              </div>
              <div className="space-y-4">
                {detectedTasks.map((task, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {task.type === 'assignment' && (
                            <ListTodo className="h-5 w-5 text-indigo-500" />
                          )}
                          {task.type === 'homework' && (
                            <MessageSquare className="h-5 w-5 text-green-500" />
                          )}
                          {task.type === 'quiz' && (
                            <Clock className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {task.text}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Detected {task.time}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* After the main content */}
      {showDownloadables && (
        <div className="space-y-4 mt-6">
          {/* PDF Download Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Notes PDF</h3>
            <p className="text-sm text-gray-500 mb-4">Click below to download the summarized notes PDF file for this session.</p>
            <a 
              href={`pdf/${pdfFileName}`}
              download
              
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Download PDF
            </a>
          </div>

          {/* Video Download Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Recorded Video</h3>
            <p className="text-sm text-gray-500 mb-4">Click below to download the recorded video of the live session.</p>
            <a 
              href={`videos/${videoFileName}`}
              download 
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Download Video
            </a>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}

export default LiveClass;

