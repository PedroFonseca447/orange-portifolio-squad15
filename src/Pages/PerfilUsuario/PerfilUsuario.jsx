import React, { useEffect, useState } from "react";
import styles from "./perfilusuario.module.css";
import Menu from "../../components/Menu/Menu";
import ModalStatus from "../../components/ModalStatus/ModalStatus";
import { getId, showAvatar } from "../../components/functions";

import {
  Autocomplete,
  Avatar,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

const PerfilUsuario = () => {
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(null);
  const [imgHover, setImgHover] = useState(false);
  const [countries, setCountries] = useState([]);
  const id = getId();
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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((response) => {
        const updatedUser = {
          ...response.data,
          country:
            response.data.country !== undefined ? response.data.country : null,
        };

        setUser(updatedUser);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/paises")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const saveUser = () => {
    const formData = new FormData();
    formData.append("name", user?.name);
    formData.append("lastName", user?.lastName);
    formData.append("email", user?.email);
    formData.append("file", user?.avatar);
    formData.append("country", user?.country);

    axios
      .patch(`http://localhost:3000/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        setModal(
          <ModalStatus
            message={"Seu perfil foi atualizado!"}
            sucess={true}
            messageButton={"Voltar para perfil"}
            action={() => setModal(null)}
          />
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Menu />
      {modal}
      <main className={styles.perfil}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={5}
          flexWrap={"nowrap"}
          width={window.innerWidth > 900 ? "50vw" : "90vw"}
        >
          <Grid
            container
            alignItems="center"
            direction={"row"}
            justifyContent="flex-start"
            spacing={2}
            margin={0}
          >
            <div
              className={styles.perfil__infoImg}
              onMouseOver={() => setImgHover(true)}
              onMouseLeave={() => setImgHover(false)}
            >
              {imgHover && (
                <label htmlFor="perfil__img" className={styles.perfil__img}>
                  <AddAPhotoIcon
                    sx={{
                      color: "var(--white)",
                    }}
                  />
                  <p className={styles.perfil__imgText}>
                    {!user?.avatar || user?.avatar === ""
                      ? "Adicionar imagem"
                      : "Trocar imagem"}
                  </p>
                </label>
              )}
              <input
                type="file"
                name="perfil__img"
                id={"perfil__img"}
                className={styles.perfil__img_input}
                onChange={(e) =>
                  setUser({ ...user, avatar: e.target.files[0] })
                }
              />
              <Avatar
                src={showAvatar(user?.avatar)}
                alt="Sua foto de perfil"
                sx={{
                  width: "105px",
                  height: "105px",
                }}
              />
            </div>

            <Grid
              item
              direction={"column"}
              justifyContent={"flex-start"}
              sx={{ paddingTop: "0 !important" }}
            >
              <Typography
                variant="body1"
                sx={{ color: "#0B0C0D", opacity: "0.6" }}
              >
                Meu perfil
              </Typography>
              <Typography variant="h4">
                {user?.name} {user?.lastName}
              </Typography>
              <Typography variant="body1">{user?.email}</Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            sx={{
              backgroundColor: "#E4E4E4",
              color: "#818181",
              "&:hover": {
                backgroundColor: "#d4d4d4",
              },
            }}
            onClick={handleLogout}
          >
            Sair
          </Button>
        </Grid>
        <section className={styles.perfil__form}>
          <div className={styles.perfil__formContainer}>
            <TextField
              id="outline"
              sx={{
                width: "100%",
              }}
              placeholder="Nome"
              value={user?.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <TextField
              id="outline"
              sx={{
                width: "100%",
              }}
              placeholder="Sobrenome"
              value={user?.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </div>
          <Select
            value={user.country || ""}
            id={'country-user'}
            onChange={(event) =>
              setUser({ ...user, country: event.target.value })
            }>
            {countries.map(country => <MenuItem value={country.nome} key={country.nome}>{country.nome}</MenuItem>)}
          </Select>
          <button className={styles.perfil__formButton} onClick={saveUser}>
            Salvar
          </button>
        </section>
      </main>
    </>
  );
};

export default PerfilUsuario;
