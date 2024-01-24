// Signup.jsx
import React, { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Firebase signup
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Retrieve Firebase user data
      const user = userCredential.user;

      // Load existing user information or create an empty object
      const existingUser = JSON.parse(localStorage.getItem("user")) || {};

      // Create user profile object
      const userProfile = {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
        // Add other profile information as needed
      };

      // Update existing user information
      localStorage.setItem("user", JSON.stringify(userProfile));

      // Load existing user profiles or create an empty array
      const existingUserProfiles =
        JSON.parse(localStorage.getItem("userProfiles")) || [];

      // Append userProfile to the existing array
      existingUserProfiles.push(userProfile);

      // Save userProfiles to localStorage (persistent)
      localStorage.setItem(
        "userProfiles",
        JSON.stringify(existingUserProfiles)
      );

      // Save user accessToken to localStorage (temporary, will be cleared on logout)
      localStorage.setItem("token", user.accessToken);

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          First Name:
          <input
            type="text"
            placeholder="Your First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            placeholder="Your Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
      <p>
        Need to Login? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
