// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOUEfKSX8Aq9ewncTAYVOEnGdwud6_yNE",
  authDomain: "sistema-login-squad15.firebaseapp.com",
  projectId: "sistema-login-squad15",
  storageBucket: "sistema-login-squad15.appspot.com",
  messagingSenderId: "392269489560",
  appId: "1:392269489560:web:5072f05f2d756d24cb37ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
