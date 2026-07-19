import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD5RbahWpzI6X_30hqZ9BHw7LfwxVy4fwA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "buddy-talk-1955c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "buddy-talk-1955c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "buddy-talk-1955c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "299535253970",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:299535253970:web:3cbb248b877bf7be3d480b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
