import { initializeApp } from "firebase/app";
// 1. You MUST import the database tool
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyAqrJ9xosy5BmXkR3ejfLx2iu5Yy4NRwv4",
  authDomain: "project-web-aed55.firebaseapp.com",
  databaseURL: "https://project-web-aed55-default-rtdb.firebaseio.com",
  projectId: "project-web-aed55",
  storageBucket: "project-web-aed55.firebasestorage.app",
  messagingSenderId: "843600993283",
  appId: "1:843600993283:web:5c68fb9a5cb0f05580c236"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Initialize the database and EXPORT it so CampusVoice.jsx can see it
export const db = getDatabase(app);