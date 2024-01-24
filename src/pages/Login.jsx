import React, { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Retrieve existing user profiles or create an empty array
      const existingUserProfiles =
        JSON.parse(localStorage.getItem("userProfiles")) || [];

      // Check if there's a profile for the logged-in user
      const userProfile = existingUserProfiles.find(
        (profile) => profile.uid === user.uid && profile.email === user.email
      );

      // If a profile is found, update the user key
      if (userProfile) {
        // Merge the user and userInfo into a single object
        const mergedUser = {
          uid: user.uid,
          email: user.email,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
        };

        // Update the user key
        localStorage.setItem("user", JSON.stringify(mergedUser));
      } else {
        // If no profile is found, create a new user profile
        const newUserProfile = {
          uid: user.uid,
          email: user.email,
          // Fetch additional user details from your backend or other sources if needed
        };

        existingUserProfiles.push(newUserProfile);

        // Save updated userProfiles to localStorage
        localStorage.setItem(
          "userProfiles",
          JSON.stringify(existingUserProfiles)
        );

        // Update the user key with the new profile
        localStorage.setItem("user", JSON.stringify(newUserProfile));
      }

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
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Your Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        Need to Signup? <Link to="/signup">Create Account</Link>
      </p>
    </div>
  );
};

export default Login;
