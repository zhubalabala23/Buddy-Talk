import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5RbahWpzI6X_30hqZ9BHw7LfwxVy4fwA",
  authDomain: "buddy-talk-1955c.firebaseapp.com",
  projectId: "buddy-talk-1955c",
  storageBucket: "buddy-talk-1955c.firebasestorage.app",
  messagingSenderId: "299535253970",
  appId: "1:299535253970:web:3cbb248b877bf7be3d480b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
