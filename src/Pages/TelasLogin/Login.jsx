import React, { useState } from "react";
import { auth, provider } from "../../services/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import imgLogin from "../../assets/img_login.png";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(newPassword.length >= 6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user has logged in with Google
    axios.get('https://orange-back-squad15.onrender.com/users/')
    .then((response) => {
      const existingUserProfiles = response.data
      const userProfile = existingUserProfiles.find(
        (profile) => profile.email === email
      );
  
      if (userProfile && userProfile.avatar.startsWith('https://')) {
        // If the user has logged in with Google, display a message
        alert(
          "Parece que você já se cadastrou via Google. Clique no botão 'Entrar com Google'"
        );
        return;
      }
    })
    .catch((error) =>{
      console.log(error);
    })

    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      localStorage.setItem("token", user.accessToken);

      navigate("/");
    } catch (error) {
      // Handle the specific error case where user is not found
      if (error.code === "auth/invalid-credential") {
        alert(
          "Este usuário não está cadastrado ou senha errada. Tente outra senha ou faça seu cadastro."
        );
      } else {
        // Log other errors to console
        console.error(error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const credential = result.credential;

      // Additional user information from Google
      const firstName = user.displayName.split(" ")[0];
      const lastName = user.displayName.split(" ")[1];

      // Check if user already exists in bd
    axios.get('https://orange-back-squad15.onrender.com/users/')
    .then((response) => {
      const existingUserProfiles = response.data
      const userProfile = existingUserProfiles.find(
        (profile) => profile.email === user.email
      );
      console.log('puxando');
  
      if (userProfile) {
        // If user exists, merge the information
        const mergedUser = {
          _id: user.uid,
          email: user.email,
          name: firstName,
          lastName,
          avatar: user.photoURL,
        };
  
        console.log("atualizarei");
        axios.patch(`https://orange-back-squad15.onrender.com/users/${userProfile._id}`, mergedUser)
        .then((response) => {
          console.log(response.data);
          console.log("atualizei");
        })
        .catch((error) => {
          console.log(error);
        })
      } else {
        // If user doesn't exist, save their information in local storage
        const newUserProfile = {
          _id: user.uid,
          email: user.email,
          name: firstName,
          lastName,
          country: "", // Add default values or fetch from user data
          avatar: user.photoURL, // You can also get the user's profile picture
        };
        console.log("novo");
  
        axios.post(`https://orange-back-squad15.onrender.com/users/`, newUserProfile)
        .then((response) => {
          console.log("criarei");
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
      }

    })
    .catch((error) =>{
      console.log(error);
    })


      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      // Redirect to the home page ("/") after successful login
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleTooglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        margin: "0",
        padding: "0",
      }}
    >
      <style>
        {`
          @media (max-width: 708px) {
            .login-image {
              display: none;
            }
          }
        `}
      </style>

      <div
        className="login-image"
        style={{ flex: "0 0 auto", width: "40%", height: "100%" }}
      >
        <img
          src={imgLogin}
          alt="Imagem de Cadastro"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          overflow: "hidden",
          margin: "0",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "16px", // Adjust margin as needed
          }}
        >
          <Typography
            gutterBottom
            style={{
              color: "#222244",
              fontSize: "48px",
              fontFamily: "Roboto, sans-serif",
              fontWeight: "400",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Entre no Orange Portfólio
          </Typography>
          <button onClick={handleGoogleSignIn} style={{ marginBottom: "16px", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px', width: '175px', boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)', color:'#757575', backgroundColor: '#fff', margin: '0 auto', border: 'none', borderRadius: '4px', gap: '8px', fontWeight: '600', fontFamily: 'var(--roboto)', cursor: 'pointer' }}>
            <img src="https://logopng.com.br/logos/google-37.png" alt="imagem google" style={{width: '20px'}}/>
            Entrar com Google
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="signup-form"
          style={{
            width: "60%",
            maxWidth: "517px",
            height: "auto",
            overflow: "hidden",
            margin: "0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginBottom: "8px",
              marginTop: "8px",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              style={{
                color: "#222244",
                fontSize: "24px",
                fontFamily: "Roboto, sans-serif",
                fontWeight: "400",
              }}
            >
              Faça login com email
            </Typography>
            <TextField
              label="Email address"
              type="email"
              variant="outlined"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "16px", marginTop: "0px" }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              required
              value={password}
              onChange={handlePasswordChange}
              error={!isPasswordValid}
              helperText={
                !isPasswordValid
                  ? "A senha deve ter pelo menos 6 caracteres"
                  : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTooglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ marginBottom: "16px", marginTop: "0px" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isPasswordValid}
              style={{
                marginBottom: "8px",
                backgroundColor: "#ff5522",
                height: "42px",
                color: "#fcfdff",
                fontSize: "15px",
                fontFamily: "Roboto, sans-serif",
                fontWeight: "500",
              }}
            >
              Entrar
            </Button>
          </div>{" "}
          <Typography>
            <Link
              to="/signup"
              style={{
                color: "grey",
                fontFamily: "Roboto, sans-serif",
                fontWeight: "400",
                fontSize: "16px",
              }}
            >
              Cadastre-se
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default Login;
