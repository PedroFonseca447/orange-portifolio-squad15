import { useState, useEffect } from "react";
import styles from "./perfilPublico.module.css";
import Menu from "../../components/Menu/Menu";
import { showAvatar, showImg } from "../../components/functions";
import { api } from "../../services/api";
import ModalProjeto from "../Descobrir/ModalProjeto/modal";

import { Autocomplete, TextField, Typography, Chip, Tooltip } from "@mui/material";



export default function PerfilPublico() {
  const id = JSON.parse(window.localStorage.getItem("user")).uid;
  const [projetos, setProjetos] = useState([]);
  const [user, setUser] = useState([]);

  const [openModal, setOpenModal] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    api.get(`/projects/user/${id}`).then((response) => {
        console.log(response.data);
        setProjetos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    api.get(`/users/${id}`).then((response) => {
        console.log(response.data);
        setUser(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const handleCloseModal  = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (cardId) => {
    setSelectedCardId(cardId);
    setOpenModal(true)
  }

      // tags apresentadas vinculadas ao perfil 
    // falta filtro para tags q aparecem mais de uma vez
    const userTags = projetos ? projetos.flatMap((projeto) => projeto.tags) : [];
    const uniqueUserTags = Array.from(new Set(userTags));

  return (
    <>
      <Menu />
      <section className={styles.cardPerfil}>
        <img
          src={showAvatar(user?.avatar)}
          alt="Sua foto de perfil"
          className={styles.cardPerfil__img}
        />
        <div className={styles.cardPerfil__info}>
            <Typography variant="h4">
              {user?.name} {user?.lastName}
            </Typography>
        </div>
            <span>{user?.country}</span>
      </section>
        <div className={styles.principaisTags}>
            <h3>Principais tags: </h3>
            {uniqueUserTags.map((tag, index) => (
                <Chip label={tag} key={index} sx={{alignSelf: 'center'}}/>
            ))}
        </div>
        <br /><br />

        <Autocomplete
          multiple
          limitTags={4}
          id="tags-outline"
          options={[...new Set([...tags, tag])] || []}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, value) => option === value}
          value={tags || []}
          onChange={(e, newValue) => setTags(newValue)}
          sx={{maxWidth: '513px', margin: 1}}
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
          <div style={{ alignItems: "flex-end" }}>
            <Typography variant="subtitle1" margin={2}>Este usuário ainda não possui projetos publicados</Typography>
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
              ?.map((projeto) => (
               <div key={projeto._id} className={styles.card} onClick={() => handleOpenModal(projeto)}>
                    <img src={showImg(projeto.projectImage)} alt="" />

                    <div className={styles.infoContainer}>
                    <span>
                        <img src={showAvatar(projeto.user.avatar)} className={styles.user} alt="" />
                        <p>{`${projeto.user.name} ${projeto.user.lastName} • ${projeto.createdAt}`}</p>
                    </span>
                    <Tooltip title={projeto?.tags?.join(' ')}>
                        {projeto?.tags.slice(0,2).map((tag, index) => (
                        <Chip label={tag} key={index} />
                        ))}
                    </Tooltip>

                    </div>
               </div>
              ))}
          </div>
        )}

        <ModalProjeto 
            open={openModal} 
            handleClose={handleCloseModal} 
            card={projetos.find(card => card._id === selectedCardId)}
            user={user.find((user) => user._id === (projetos.find(card => card._id === selectedCardId)?.user))} />
    </>
  )
}