// Import the functions you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7nw6KQ7K-uQb_-dqhci1fQ38OPxhoqu4",
  authDomain: "greenstreak-d7860.firebaseapp.com",
  projectId: "greenstreak-d7860",
  storageBucket: "greenstreak-d7860.firebasestorage.app",
  messagingSenderId: "758233568149",
  appId: "1:758233568149:web:8673951d455f2812819c9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Initialize Firestore and export it
export const db = getFirestore(app);
