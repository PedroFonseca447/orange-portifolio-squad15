// Signup.jsx
import React, { useState } from "react";
import { auth } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TextField from "@mui/material/TextField";
import imgCadastro from "../../assets/img_cadastro.png";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userCreatedAlert, setUserCreatedAlert] = useState(false);

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
        _id: user.uid,
        email: user.email,
        name: firstName,
        lastName,
      };

      // Carrega o user no bd
      axios
        .post("http://localhost:3000/users/", userProfile)
        .then((response) => {
          console.log(response.data);
          setUserCreatedAlert(true);
          resetForm();

          // Fechar o alerta após 6 segundos
          setTimeout(() => {
            setUserCreatedAlert(false);
          }, 6000);
        })
        .catch((error) => {
          console.log(error);
        });

      /* const existingUserProfiles =
        JSON.parse(localStorage.getItem("userProfiles")) || [];

      // Se o array já estiver criado, só envia
      existingUserProfiles.push(userProfile);

      //  Salva no localStorage
      localStorage.setItem(
        "userProfiles",
        JSON.stringify(existingUserProfiles)
      ); */
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
          @media (max-width: 768px) {
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
        {userCreatedAlert && (
          <Alert
            variant="filled"
            severity="success"
            iconMapping={{
              success: <CheckCircleOutlineIcon />,
            }}
            onClose={() => setUserCreatedAlert(false)}
            style={{ position: "absolute", top: "52px" }}
          >
            Cadastro feito com sucesso
          </Alert>
        )}

        <Typography
          variant="h4"
          gutterBottom
          style={{
            color: "#222244",
            fontSize: "48px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: "400",
          }}
        >
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
              marginBottom: "8px",
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
              style={{ width: "50%", marginRight: "16px" }}
            />
            <TextField
              label="Sobrenome"
              type="text"
              variant="outlined"
              margin="normal"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ width: "50%" }}
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
                color: "#fcfdff",
                height: "42px",
                fontFamily: "Roboto, sans-serif",
                fontWeight: "500",
              }}
            >
              Cadastrar
            </Button>
            <Typography
              style={{
                color: "#d3d3d3",
                fontFamily: "Roboto, sans-serif",
                fontWeight: "400",
                fontSize: "16px",
                marginTop: "8px",
              }}
            >
              Já possui cadastro?{" "}
              <Link
                style={{
                  color: "grey",
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
                to="/login"
              >
                Login
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
