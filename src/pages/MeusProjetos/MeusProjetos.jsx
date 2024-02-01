import React, { useState } from "react";
import styles from "./meusprojetos.module.css";
import Menu from "../../components/Menu/Menu";
import Card from "../../components/Card/Card";
import ModalProjetoManager from "../../components/ModalProjetoManager/ModalProjetoManager";
import { Autocomplete, Skeleton, TextField } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import ModalStatus from "../../components/ModalStatus/ModalStatus";
import ModalConfirmation from "../../components/ModalConfirmation/ModalConfirmation";
import ModalPreview from "../../components/ModalPreview/ModalPreview";
import { cardsData } from "../../components/cardsData";
import { useEffect } from "react";
import axios from "axios";

const MeusProjetos = () => {
  const user = {
    name: "Alice",
    lastName: "Alexandra",
    country: "Brasil",
    email: "alicealx@gmail.com",
    _id: 3,
    avatar: "/src/assets/Alice.png",
  };
  const [projetos, setProjetos] = useState([]);

  const [modal, setModal] = useState(null);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3000/projects')
    .then((response) => {
      console.log(response.data);
      setProjetos(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])

  const onCloseModal = () => {
    setModal(null);
  };

  const onCreateCard = () => {
    setModal(
      <ModalProjetoManager
        projeto={null}
        onCloseModal={onCloseModal}
        onSaveCard={onSaveCard}
        showPreviewCard={showPreviewCard}
      />
    );
  };

  const onEditCard = (card) => {
    setModal(
      <ModalProjetoManager
        projeto={card}
        onCloseModal={onCloseModal}
        onSaveCard={onSaveCard}
        showPreviewCard={showPreviewCard}
      />
    );
  };

  const showPreviewCard = (card) => {
    setModal(
      <ModalPreview
        handleClose={() =>
          setModal(
            <ModalProjetoManager
              projeto={card}
              onCloseModal={onCloseModal}
              onSaveCard={onSaveCard}
              showPreviewCard={showPreviewCard}
            />
          )
        }
        card={card}
      />
    );
  };

  const showCard = (card) => {
    setModal(<ModalPreview handleClose={() => setModal(null)} card={card} />);
  };

  const confirmDeleteCard = (card) => {
    setModal(
      <ModalConfirmation
        title={"Deseja Excluir?"}
        message={"Se você prosseguir irá excluir o projeto do seu portfólio"}
        action={() => onDeleteCard(card)}
        cancel={() => setModal(null)}
        textConfirm={"Excluir"}
      />
    );
  };

  const onDeleteCard = (card) => {
    const deleteProjeto = projetos.filter(
      (projeto) => card?._id !== projeto?._id
    );
    setProjetos(deleteProjeto);
    setModal(
      <ModalStatus
        message={"Projeto deletado com sucesso!"}
        messageButton={"Voltar para projetos"}
        sucess={true}
        action={() => setModal(null)}
      />
    );
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
      setModal(
        <ModalStatus
          message={"Edição concluída com sucesso!"}
          messageButton={"Voltar para projetos"}
          sucess={true}
          action={() => setModal(null)}
        />
      );
    } else {
      const newCard = {
        ...card,
        name: user?.name,
        lastName: user?.lastName,
        user: user?._id,
        avatar: user?.avatar,
        createdAt: `${new Date().getDate()}/${new Date().getMonth() + 1}`,
        _id: projetos.length + 1,
      };
      setProjetos([...projetos, newCard]);
      setModal(
        <ModalStatus
          message={"Projeto adicionado com sucesso!"}
          messageButton={"Voltar para projetos"}
          sucess={true}
          action={() => setModal(null)}
        />
      );
    }
  };

  console.log(projetos);

  return (
    <>
      <Menu />
      {modal}
      <section className={styles.cardPerfil}>
        <img
          src={user?.avatar}
          alt="Sua foto de perfil"
          className={styles.cardPerfil__img}
        />
        <div className={styles.cardPerfil__info}>
          <div className={styles.cardPerfil__infoUser}>
            <h3>
              {user?.name} {user?.lastName}
            </h3>
            <span>{user?.country}</span>
          </div>
          <button onClick={onCreateCard}>Adicionar projeto</button>
        </div>
      </section>
      <main className={styles.meusProjetos}>
        <h6>Meus projetos</h6>
        <Autocomplete
          multiple
          className={styles.meusProjetos__inputTags}
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
        {projetos?.filter(
          (projeto) =>
            projeto?.user === user?._id &&
            (tags.length === 0 ||
              projeto.tags.some((tagProjeto) =>
                tags.some(
                  (tagSearch) =>
                    tagSearch.toLowerCase() === tagProjeto.toLowerCase()
                )
              ))
        )?.length === 0 ? (
          <div className={styles.cards} style={{ alignItems: "flex-end" }}>
            <div
              className={styles.meusProjetos__addProjetos}
              onClick={onCreateCard}
            >
              <div className={styles.addProjetos__container}>
                <CollectionsIcon
                  sx={{
                    width: "46px",
                    height: "46px",
                    flexShrink: 0,
                    color: "#323232",
                  }}
                />
                <p>Adicione seu primeiro projeto</p>
                <p>Compartilhe seu talento com milhares de pessoas</p>
              </div>
            </div>
            <Skeleton variant="rectangular" width={389} height={258} />
            <Skeleton variant="rectangular" width={389} height={258} />
          </div>
        ) : (
          <div className={styles.cards}>
            {projetos
              ?.filter(
                (projeto) =>
                  projeto?.user === user?._id &&
                  (tags.length === 0 ||
                    projeto.tags.some((tagProjeto) =>
                      tags.some(
                        (tagSearch) =>
                          tagSearch.toLowerCase() === tagProjeto.toLowerCase()
                      )
                    ))
              )
              ?.map((projeto, index) => (
                <Card
                  key={projeto?._id}
                  data={projeto}
                  onEditCard={onEditCard}
                  onDeleteCard={confirmDeleteCard}
                  user={user}
                  showCard={showCard}
                />
              ))}
          </div>
        )}
      </main>
    </>
  );
};

export default MeusProjetos;
