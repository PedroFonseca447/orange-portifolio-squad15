import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import ModalStatus from '../../components/ModalStatus/ModalStatus'
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import './perfilusuario.css'

const PerfilUsuario = () => {
  const [user, setUser] = useState({
    name: "Camila",
    lastName: "Soares",
    country: "Brasil",
    email: "camilaso@gmail.com",
    _id: 1,
    avatar: "src/assets/Bianca.png",
  });
  const [modal, setModal] = useState(null)
  const [imgHover, setImgHover] = useState(false)
  const [countries, setCountries] = useState([])

  useEffect(() =>{
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/paises')
    .then((response) => {
      setCountries(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
  },[])

  const saveUser = () =>{
    console.log("Dados atualizados", user);
    setModal(<ModalStatus message={'Seu perfil foi atualizado!'} sucess={true} messageButton={'Voltar para perfil'} action={() => setModal(null)}/>)
  }

  const showAvatar = (img) =>{
    if(!img || img === ""){
      return '/imgs/default-avatar.png';
    }else if(typeof img === 'object'){
      return URL.createObjectURL(img);
    }else{
      return img
    }
  }

  return (
    <>
      <Menu />
      {modal}
      <main className="perfil">
        <section className="perfil__info">
            <div className="perfil__info-img" 
            onMouseOver={() => setImgHover(true)}
            onMouseLeave={() => setImgHover(false)}>
                {imgHover && <label htmlFor="perfil__img" className="perfil__img">
                    <AddAPhotoIcon className="perfil__img-icon"/>
                    <p className="perfil__img-text">{!user?.avatar || user?.avatar === "" ? "Adicionar imagem" : "Trocar imagem"}</p>
                </label>}
                <input type="file" name="perfil__img" id="perfil__img" onChange={(e) => setUser({...user, avatar: e.target.files[0]})}/>
                <img src={showAvatar(user?.avatar)} alt="Sua foto de perfil" />
            </div>
            <div className="perfil__info-text">
                <p>Meu perfil</p>
                <h1>{user?.name} {user?.lastName}</h1>
            </div>
        </section>
        <section className="perfil__form">
          <div className="perfil__form-container">
            <TextField
              id="outline"
              className="perfil__form-input"
              label="Nome"
              defaultValue={user?.name}
              onChange={(e) => setUser({...user, name: e.target.value})}
            />
            <TextField
              id="outline"
              className="perfil__form-input"
              label="Sobrenome"
              defaultValue={user?.lastName}
              onChange={(e) => setUser({...user, lastName: e.target.value})}
            />
          </div>
          <TextField
            id="outline"
            className="perfil__form-input"
            label="Email"
            defaultValue={user?.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
          />
          <Autocomplete
            options={countries}
            disableCloseOnSelect
            getOptionLabel={(option) => option.nome}
            renderInput={(params) => (
              <TextField
                {...params}
                id="outline"
                className="perfil__form-input"
                label="País"
                defaultValue={user?.country}
                onChange={(e) => setUser({...user, country: e.target.value})}
              />
            )}
          >
          </Autocomplete>
          <button className="perfil__form-button" onClick={saveUser}>Salvar</button>
        </section>
      </main>
    </>
  );
};

export default PerfilUsuario;
