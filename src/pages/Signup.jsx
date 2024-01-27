// Signup.jsx
import React, { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import imgCadastro from "/Users/macbook/Desktop/projeto-squad15/orange-portifolio-squad15/src/assets/img_cadastro.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setFirstName("");
    setLastName("");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sobe user para o Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Retorno de alguns dados do Firebase
      const user = userCredential.user;

      // Cria array com info do user
      const userProfile = {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
      };

      // Carrega o user no bd
      const existingUserProfiles =
        JSON.parse(localStorage.getItem("userProfiles")) || [];

      // Se o array já estiver criado, só envia
      existingUserProfiles.push(userProfile);

      //  Salva no localStorage
      localStorage.setItem(
        "userProfiles",
        JSON.stringify(existingUserProfiles)
      );

      alert("Usuario Criado!");

      resetForm();
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
          src={imgCadastro}
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
        <Typography variant="h4" gutterBottom>
          Cadastre-se
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
              flexDirection: "row",
              width: "100%",
            }}
          >
            <TextField
              label="Nome"
              type="text"
              variant="outlined"
              margin="normal"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ width: "50%", marginRight: "8px", marginTop: "0px" }}
            />
            <TextField
              label="Sobrenome"
              type="text"
              variant="outlined"
              margin="normal"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ width: "50%", marginTop: "0px" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginBottom: "8px",
            }}
          >
            <TextField
              label="Email address"
              type="email"
              variant="outlined"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "8px", marginTop: "0px" }}
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
              style={{ marginTop: "0px" }}
            />
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </div>
        </form>

        <Typography>
          Já possui cadastro? <Link to="/login">Login</Link>
        </Typography>
      </div>
    </div>
  );
};

export default Signup;
