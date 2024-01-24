import React from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userInfo = user || null; // Retrieve userInfo directly from user key

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome to React Firebase Auth using email and password</h1>
      {userInfo && (
        <div>
          <h2>
            Welcome, {userInfo.firstName} {userInfo.lastName}!
          </h2>
          <p>Email: {userInfo.email}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
