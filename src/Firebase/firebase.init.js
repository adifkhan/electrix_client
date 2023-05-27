// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX5KHvnmP6Sl9LKFL05m2i5XmDjMc8zGU",
  authDomain: "electrix-4c5e1.firebaseapp.com",
  projectId: "electrix-4c5e1",
  storageBucket: "electrix-4c5e1.appspot.com",
  messagingSenderId: "31807032156",
  appId: "1:31807032156:web:ac604c0796ddfd4eb9cf99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
