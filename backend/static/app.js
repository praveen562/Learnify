let recording = false;
let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;
const startButton = document.getElementById("start-btn");
const timerDisplay = document.getElementById("timer");
const transcriptionDiv = document.getElementById("transcription");

startButton.addEventListener('click', () => {
    if (recording) {
        stopRecording();
    } else {
        startRecording();
    }
});

function startRecording() {
    recording = true;
    startButton.textContent = "Stop Recording";
    startButton.classList.replace("bg-blue-500", "bg-red-500");

    // Start timer
    timerInterval = setInterval(updateTimer, 1000);

    // Send a request to start recording on the server
    fetch('/start-recording')
        .then(response => response.json())
        .then(data => {
            console.log("Recording started:", data);
            listenForSpeech();
        })
        .catch(err => console.error('Error starting recording:', err));
}

function stopRecording() {
    recording = false;
    startButton.textContent = "Start Recording";
    startButton.classList.replace("bg-red-500", "bg-blue-500");

    // Stop timer
    clearInterval(timerInterval);

    // Send a request to stop recording on the server
    fetch('/stop-recording')
        .then(response => response.json())
        .then(data => {
            console.log("Recording stopped:", data);
        })
        .catch(err => console.error('Error stopping recording:', err));
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    timerDisplay.textContent = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
}

function padTime(time) {
    return time < 10 ? '0' + time : time;
}

// Function to listen for speech and update transcription in real-time
function listenForSpeech() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        transcriptionDiv.innerHTML = transcript;
    };

    recognition.onend = function() {
        if (recording) {
            listenForSpeech();  // Restart speech recognition if recording is still active
        }
    };

    recognition.start();
}
