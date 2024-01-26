import React, { useState } from "react";
import "./meusprojetos.css";
import Menu from "../../components/Menu/Menu";
import Card from "../../components/Card/Card";
import ModalProjetoManager from "../../components/ModalProjetoManager/ModalProjetoManager";
import { Autocomplete, TextField } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import ModalStatus from "../../components/ModalStatus/ModalStatus";

const MeusProjetos = () => {
  const user = {
    nome: "Camila",
    sobrenome: "Soares",
    country: "Brasil",
    id: 1,
    fotoUser: "src/assets/Bianca.png",
  };
  const [projetos, setProjetos] = useState([
    {
      nome: "Camila",
      sobrenome: "Soares",
      titulo: "Ecommerce One Page",
      data: "12/23",
      imagem: "src/assets/card1.png",
      fotoUser: "src/assets/Bianca.png",
      tags: ["UX", "Web"],
      descricao:
        "Temos o prazer de compartilhar com vocês uma variação da nosso primeiro recurso gratuito, Monoceros. É um modelo de uma página para mostrar seus produtos. Tentamos redesenhar uma versão mais B2C e minimalista do nosso primeiro template de e-commerce.",
      link: "https://gumroad.com/products/wxCSL",
      idUser: 1,
      id: 1,
    },
    {
      nome: "Camila",
      sobrenome: "Soares",
      titulo: "Landing page orange",
      data: "11/23",
      imagem: "src/assets/card2.png",
      fotoUser: "src/assets/Bianca.png",
      tags: ["Web", "Mobile"],
      descricao:
        "Temos o prazer de compartilhar com vocês uma variação da nosso primeiro recurso gratuito, Monoceros. É um modelo de uma página para mostrar seus produtos. Tentamos redesenhar uma versão mais B2C e minimalista do nosso primeiro template de e-commerce.",
      link: "https://gumroad.com/products/wxCSL",
      idUser: 1,
      id: 2,
    },
  ]);

  const [modal, setModal] = useState(null);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  const onCloseModal = () => {
    setModal(null);
  };

  const onCreateCard = () => {
    setModal(
      <ModalProjetoManager
        projeto={null}
        onCloseModal={onCloseModal}
        onSaveCard={onSaveCard}
      />
    );
  };

  const onEditCard = (card) => {
    setModal(
      <ModalProjetoManager
        projeto={card}
        onCloseModal={onCloseModal}
        onSaveCard={onSaveCard}
      />
    );
  };

  const onDeleteCard = (card) => {
    const deleteProjeto = projetos.filter(
      (projeto) => card?.id !== projeto?.id
    );
    setProjetos(deleteProjeto);
  };

  const onSaveCard = (card) => {
    if (projetos.some((projeto) => projeto?.id === card?.id)) {
      const updateProjeto = projetos?.map((projeto) => {
        if (projeto?.id === card?.id) {
          return card;
        }
        return projeto;
      });
      setProjetos(updateProjeto);
      setModal(<ModalStatus message={"Edição concluída com sucesso!"} messageButton={'Voltar para projetos'} sucess={true} action={() => setModal(null)}/>);
    } else {
      const newCard = {
        ...card,
        nome: user?.nome,
        sobrenome: user?.sobrenome,
        idUser: user?.id,
        fotoUser: user?.fotoUser,
        data: `${new Date().getDate()}/${new Date().getMonth() + 1}`,
        id: projetos.length + 1,
      };
      setProjetos([...projetos, newCard]);
      setModal(<ModalStatus message={"Projeto adicionado com sucesso!"} messageButton={'Voltar para projetos'} sucess={true} action={() => setModal(null)}/>);
    }
  };

  return (
    <>
      <Menu />
      {modal}
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
          <button onClick={onCreateCard}>Adicionar projeto</button>
        </div>
      </section>
      <main className="meus-projetos">
        <h6>Meus projetos</h6>
        <Autocomplete
          multiple
          className="meus-projetos__input-tags"
          id="tags-outline"
          options={tags ? [...tags, tag] : [tag]}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, value) => option === value}
          defaultValue={tags || []}
          onChange={(e, newValue) => setTags(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              id="outline"
              label="Buscar tags"
              placeholder="Buscar tags"
              onChange={(e) => setTag(e.target.value)}
            />
          )}
        />
        {projetos.length === 0 ? (
          <div className="meus-projetos__add-projetos" onClick={onCreateCard}>
            <div className="add-projetos__container">
              <CollectionsIcon className="add-projetos__icon" />
              <p>Adicione seu primeiro projeto</p>
              <p>Compartilhe seu talento com milhares de pessoas</p>
            </div>
          </div>
        ) : (
          <div className="cards">
            {projetos
              ?.filter((projeto) => tags.length === 0 || projeto.tags.some(tagProjeto => tags.some(tagSearch => tagSearch === tagProjeto)))
              ?.map((projeto) => (
                <Card
                  key={projeto?.id}
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
