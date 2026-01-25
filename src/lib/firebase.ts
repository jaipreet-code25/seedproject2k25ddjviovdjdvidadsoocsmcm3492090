// Firebase Configuration for Happy Drains Solutions Blog
//
// ⚠️ IMPORTANT: You need to set up your own Firebase project!
//
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com/
// 2. Click "Create a project" (or use an existing one)
// 3. Go to Project Settings (gear icon) > General > Your apps
// 4. Click "Add app" and select Web (</>)
// 5. Register your app with a nickname (e.g., "happy-drains-blog")
// 6. Copy the firebaseConfig values and replace the placeholders below
//
// 7. Go to Build > Firestore Database in the left sidebar
// 8. Click "Create database"
// 9. Choose "Start in production mode" and select a location
// 10. Go to the "Rules" tab and replace the rules with:
//
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /blogPosts/{document=**} {
//          allow read: if true;
//          allow write: if true;
//        }
//      }
//    }
//
// 11. Click "Publish" to save the rules
//
// After setup, your blog posts will be globally accessible and update in real-time!
// Anyone with the admin password can post, and posts are visible to everyone.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace these values with your Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",           // e.g., "AIzaSyD..."
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",      // e.g., "happy-drains-blog"
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
