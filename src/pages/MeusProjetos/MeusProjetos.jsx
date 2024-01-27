import React, { useState } from "react";
import "./meusprojetos.css";
import Menu from "../../components/Menu/Menu";
import Card from "../../components/Card/Card";
import ModalProjetoManager from "../../components/ModalProjetoManager/ModalProjetoManager";
import { Autocomplete, TextField } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import ModalStatus from "../../components/ModalStatus/ModalStatus";
import ModalConfirmation from "../../components/ModalConfirmation/ModalConfirmation";

const MeusProjetos = () => {
  const user = {
    name: "Camila",
    lastName: "Soares",
    country: "Brasil",
    email: "camilaso@gmail.com",
    _id: 1,
    avatar: "src/assets/Bianca.png",
  };
  const [projetos, setProjetos] = useState([
    {
      name: "Camila",
      lastName: "Soares",
      title: "Ecommerce One Page",
      data: "12/23",
      projectImage: "src/assets/card1.png",
      avatar: "src/assets/Bianca.png",
      tags: ["UX", "Web"],
      description:
        "Temos o prazer de compartilhar com vocês uma variação da nosso primeiro recurso gratuito, Monoceros. É um modelo de uma página para mostrar seus produtos. Tentamos redesenhar uma versão mais B2C e minimalista do nosso primeiro template de e-commerce.",
      urlGithub: "https://gumroad.com/products/wxCSL",
      idUser: 1,
      _id: 1,
    },
    {
      name: "Camila",
      lastName: "Soares",
      title: "Landing page orange",
      data: "11/23",
      projectImage: "src/assets/card2.png",
      avatar: "src/assets/Bianca.png",
      tags: ["Web", "Mobile"],
      description:
        "Temos o prazer de compartilhar com vocês uma variação da nosso primeiro recurso gratuito, Monoceros. É um modelo de uma página para mostrar seus produtos. Tentamos redesenhar uma versão mais B2C e minimalista do nosso primeiro template de e-commerce.",
      urlGithub: "https://gumroad.com/products/wxCSL",
      idUser: 1,
      _id: 2,
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

  const confirmDeleteCard = (card) => {
    setModal(<ModalConfirmation title={'Deseja Excluir?'} message={'Se você prosseguir irá excluir o projeto do seu portfólio'} action={() => onDeleteCard(card)} cancel={() => setModal(null)} textConfirm={'Excluir'}/>)
  }

  const onDeleteCard = (card) => {
    const deleteProjeto = projetos.filter(
      (projeto) => card?._id !== projeto?._id
    );
    setProjetos(deleteProjeto);
    setModal(<ModalStatus message={"Projeto deletado com sucesso!"} messageButton={'Voltar para projetos'} sucess={true} action={() => setModal(null)}/>);
  };

  const onSaveCard = (card) => {
    if (projetos.some((projeto) => projeto?._id === card?._id)) {
      const updateProjeto = projetos?.map((projeto) => {
        if (projeto?._id === card?._id) {
          return card;
        }
        return projeto;
      });
      setProjetos(updateProjeto);
      setModal(<ModalStatus message={"Edição concluída com sucesso!"} messageButton={'Voltar para projetos'} sucess={true} action={() => setModal(null)}/>);
    } else {
      const newCard = {
        ...card,
        name: user?.name,
        lastName: user?.lastName,
        idUser: user?._id,
        avatar: user?.avatar,
        data: `${new Date().getDate()}/${new Date().getMonth() + 1}`,
        _id: projetos.length + 1,
      };
      setProjetos([...projetos, newCard]);
      setModal(<ModalStatus message={"Projeto adicionado com sucesso!"} messageButton={'Voltar para projetos'} sucess={true} action={() => setModal(null)}/>);
    }
  };
  console.log(projetos);

  return (
    <>
      <Menu />
      {modal}
      <section className="card-perfil">
        <img
          src={user?.avatar}
          alt="Sua foto de perfil"
          className="card-perfil__img"
        />
        <div className="card-perfil__info">
          <div className="card-perfil__info-user">
            <h3>
              {user?.name} {user?.lastName}
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
                  key={projeto?._id}
                  data={projeto}
                  onEditCard={onEditCard}
                  onDeleteCard={confirmDeleteCard}
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
