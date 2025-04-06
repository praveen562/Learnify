// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhzKDdriO8bszzbOV1ZqeA9kSCsVdTdoE",
  authDomain: "learnify-a3c67.firebaseapp.com",
  projectId: "learnify-a3c67",
  storageBucket: "learnify-a3c67.firebasestorage.app",
  messagingSenderId: "44538837520",
  appId: "1:44538837520:web:b1b1d8cf5c5a140dbf6895",
  measurementId: "G-9VBR1LHK7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);