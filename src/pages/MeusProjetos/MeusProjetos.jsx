import React, { useState } from "react";
import "./meusprojetos.css";
import Menu from "../../components/Menu/Menu";
import TextField from "@mui/material/TextField";
import CollectionsIcon from "@mui/icons-material/Collections";
import Card from "../../components/Card/Card";

const MeusProjetos = () => {
  const user = {
    nome: "Camila",
    sobrenome: "Soares",
    country: "Brasil",
    id: 1,
  };
  const [projetos, setProjetos] = useState([
    {
      nome: "Camila",
      sobrenome: "Soares",
      titulo: "Ecommerce One Page",
      data: "12/23",
      fotoUser: "src/assets/card1.png",
      imagem: "src/assets/Bianca.png",
      tags: ["UX", "Web"],
      descricao:
        "Temos o prazer de compartilhar com vocês uma variação da nosso primeiro recurso gratuito, Monoceros. É um modelo de uma página para mostrar seus produtos. Tentamos redesenhar uma versão mais B2C e minimalista do nosso primeiro template de e-commerce.",
      link: "https://gumroad.com/products/wxCSL",
      idUser: 1,
      id: 1,
    },
  ]);
  const [tags, setTags] = useState("")
  const onEditCard = (card) => {};

  const onDeleteCard = (card) => {
    const deleteProjeto = projetos.filter((projeto) => card?.id !== projeto?.id)
    setProjetos(deleteProjeto)
  };

  return (
    <>
      <Menu />
      <section className="card-perfil">
        <img
          src="/imgs/Image.png"
          alt="Sua foto de perfil"
          className="card-perfil__img"
        />
        <div className="card-perfil__info">
          <div className="card-perfil__info-user">
            <h3>
              {user?.nome} {user?.sobrenome}
            </h3>
            <span>{user?.country}</span>
          </div>
          <button>Adicionar projeto</button>
        </div>
      </section>
      <main className="meus-projetos">
        <h6>Meus projetos</h6>
        <TextField
          id="outlined"
          label="Buscar tags"
          className="meus-projetos__input-tags"
        />
        {projetos.length === 0 ? (
          <div className="meus-projetos__add-projetos">
            <div className="add-projetos__container">
              <CollectionsIcon className="add-projetos__icon" />
              <p>Adicione seu primeiro projeto</p>
              <p>Compartilhe seu talento com milhares de pessoas</p>
            </div>
          </div>
        ) : (
          <div className="cards">
            {projetos?.map((projeto) => (
              <Card
                data={projeto}
                onEditCard={onEditCard}
                onDeleteCard={onDeleteCard}
                user={user}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default MeusProjetos;
