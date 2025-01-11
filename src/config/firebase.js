import { initializeApp } from "firebase/app";

const config = {
  apiKey: "AIzaSyDICasyIWwenWh-VQUbtbYcBsmqSPwClZk",
  authDomain: "task-management-b65b6.firebaseapp.com",
  projectId: "task-management-b65b6",
  storageBucket: "task-management-b65b6.firebasestorage.app",
  messagingSenderId: "190603740425",
  appId: "1:190603740425:web:0a665780de6a9fb4d97fd8",
  measurementId: "G-NCY5NW3KJE",
  databaseURL:"https://task-management-b65b6-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
export const firebaseConfig = initializeApp(config);