import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import styles from "../../Pages/MeusProjetos/meusprojetos.module.css";
import Menu from "../../components/Menu/Menu";
import Card from "../../components/Card/Card";
import ModalProjetoManager from "../../components/ModalProjetoManager/ModalProjetoManager";
import ModalStatus from "../../components/ModalStatus/ModalStatus";
import ModalConfirmation from "../../components/ModalConfirmation/ModalConfirmation";
import ModalPreview from "../../components/ModalPreview/ModalPreview";
import { getId, showAvatar } from "../../components/functions";

import { Autocomplete, Skeleton, TextField } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import axios from "axios";

const MeusProjetos = () => {
  const id = getId()
  const [projetos, setProjetos] = useState([]);
  const [user, setUser] = useState([]);

  const [modal, setModal] = useState(null);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/projects/user/${id}`)
      .then((response) => {
        console.log(response.data);
        setProjetos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      axios.get(`http://localhost:3000/users/${id}`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
      axios.get(`http://localhost:3000/users/`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

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
        onSaveCard={editCard}
        showPreviewCard={showPreviewCard}
      />
    );
  };

  const showPreviewCard = (card) => {
    const newCard = {
      ...user,
      ...card,
    };
    console.log("new card", newCard);
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
        card={newCard}
      />
    );
  };

  const showCard = (card) => {
    const newCard = {
      ...user,
      ...card,
    };
    console.log("new card", newCard);
    setModal(
      <ModalPreview handleClose={() => setModal(null)} card={newCard} />
    );
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
    axios
      .delete(`http://localhost:3000/projects/${card._id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
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
      const formData = new FormData();
      formData.append("file", card?.projectImage);
      formData.append("urlGithub", card?.urlGithub);
      formData.append("title", card?.title);
      formData.append("description", card?.description);
      formData.append("user", user?._id);
      formData.append("tags", card?.tags);

      const newCard = {
        urlGithub: card?.urlGithub,
        title: card?.title,
        description: card?.description,
        tags: card?.tags,
        user: id,
        projectImage: card?.projectImage,
        createdAt: new Date()
      };

      axios
        .post(`http://localhost:3000/projects/`, formData, {
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          console.log(response.data);
          setProjetos([...projetos, {...newCard, _id: response.data.project._id}]);
          setModal(
            <ModalStatus
              message={"Projeto adicionado com sucesso!"}
              messageButton={"Voltar para projetos"}
              sucess={true}
              action={() => setModal(null)}
            />
          );
        })
        .catch((error) => {
          console.log(error);
          setModal(
            <ModalStatus
              message={"Projeto não foi adicionado!"}
              messageButton={"Voltar para projetos"}
              sucess={false}
              action={() => setModal(null)}
            />
          );
        });
  };

const editCard = (card) => {
    const formData = new FormData();
    formData.append("file", card?.projectImage);
    formData.append("urlGithub", card?.urlGithub);
    formData.append("title", card?.title);
    formData.append("description", card?.description);
    formData.append("tags", card?.tags);

    axios
      .patch(`http://localhost:3000/projects/${card._id}`, formData, {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response.data);
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
      })
      .catch((error) => {
        console.log(error);
        setModal(
          <ModalStatus
            message={"Edição não foi concluída!"}
            messageButton={"Voltar para projetos"}
            sucess={false}
            action={() => setModal(null)}
          />
        );
      });
    }

  return (
    <>
      <Menu />
      {modal}
      <section className={styles.cardPerfil}>
        <img
          src={showAvatar(user?.avatar)}
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
          limitTags={4}
          id="tags-outline"
          options={[...new Set([...tags, tag])] || []}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, value) => option === value}
          value={tags || []}
          className={styles.meusProjetos__inputTags}
          onChange={(e, newValue) => setTags(newValue)}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              id="outline"
              label="Buscar Tags"
              placeholder="Buscar Tags"
              onChange={(e) => setTag(e.target.value)}
            />
          )}
        />
        {projetos?.filter(
          (projeto) =>
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