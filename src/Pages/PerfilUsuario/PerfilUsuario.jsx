import React, { useEffect, useState } from "react";
import styles from "./perfilusuario.module.css";
import Menu from "../../components/Menu/Menu";
import ModalStatus from "../../components/ModalStatus/ModalStatus";
import { showAvatar } from "../../components/functions";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";

const PerfilUsuario = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user")) || {}
  );
  const [modal, setModal] = useState(null);
  const [imgHover, setImgHover] = useState(false);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    console.log("Dados atualizados", user);
    setModal(
      <ModalStatus
        message={"Seu perfil foi atualizado!"}
        sucess={true}
        messageButton={"Voltar para perfil"}
        action={() => setModal(null)}
      />
    );
  };

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
    <>
      <Menu />
      {modal}
      <main className={styles.perfil}>
        <section className={styles.perfil__info}>
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
              id={styles.perfil__img}
              onChange={(e) => setUser({ ...user, avatar: e.target.files[0] })}
            />
            <img src={showAvatar(user?.avatar)} alt="Sua foto de perfil" />
          </div>
          <div className={styles.perfil__infoText}>
            <p>Meu perfil</p>
            <h1>
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
        </section>
        <section className={styles.perfil__form}>
          <div className={styles.perfil__formContainer}>
            <TextField
              id="outline"
              sx={{
                width: "100%",
              }}
              label="Nome"
              defaultValue={user?.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
            <TextField
              id="outline"
              sx={{
                width: "100%",
              }}
              label="Sobrenome"
              defaultValue={user?.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </div>
          <TextField
            id="outline"
            sx={{
              width: "100%",
            }}
            label="Email"
            defaultValue={user?.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Autocomplete
            options={countries}
            disableCloseOnSelect
            getOptionLabel={(option) => option.nome}
            defaultValue={{ nome: user?.country }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="outline"
                sx={{
                  width: "100%",
                }}
                label="País"
                defaultValue={user?.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
              />
            )}
          ></Autocomplete>
          <button className={styles.perfil__formButton} onClick={saveUser}>
            Salvar
          </button>
        </section>
        <button className={styles.perfil__logout} onClick={handleLogout}>
          <LogoutIcon />
          Sair
        </button>
      </main>
    </>
  );
};

export default PerfilUsuario;
