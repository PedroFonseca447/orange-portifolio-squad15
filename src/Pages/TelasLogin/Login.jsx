import React, { useState } from "react";
import { auth } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import imgLogin from "/Users/macbook/Desktop/projeto-squad15/orange-portifolio-squad15/src/assets/img_login.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      const existingUserProfiles =
        JSON.parse(localStorage.getItem("userProfiles")) || [];

      const userProfile = existingUserProfiles.find(
        (profile) => profile.uid === user.uid && profile.email === user.email
      );

      if (userProfile) {
        const mergedUser = {
          uid: user.uid,
          email: user.email,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
        };

        localStorage.setItem("user", JSON.stringify(mergedUser));
      } else {
        const newUserProfile = {
          uid: user.uid,
          email: user.email,
        };

        existingUserProfiles.push(newUserProfile);

        localStorage.setItem(
          "userProfiles",
          JSON.stringify(existingUserProfiles)
        );

        localStorage.setItem("user", JSON.stringify(newUserProfile));
      }

      localStorage.setItem("token", user.accessToken);

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
      <div style={{ flex: "0 0 auto", width: "40%", height: "100%" }}>
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
        <Typography
          gutterBottom
          style={{
            color: "#222244",
            fontSize: "48px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: "400",
          }}
        >
          Entre no Orange Portfólio
        </Typography>
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
              onChange={(e) => setPassword(e.target.value)}
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
