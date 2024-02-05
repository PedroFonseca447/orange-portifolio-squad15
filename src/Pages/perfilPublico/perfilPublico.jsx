import { useState, useEffect } from "react";
import styles from "./perfilPublico.module.css";
import Menu from "../../components/Menu/Menu";
import { showAvatar, showImg, getId } from "../../components/functions";
import { api } from "../../services/api";
import ModalProjeto from "../Descobrir/ModalProjeto/modal";

import { Autocomplete, TextField, Typography, Chip, Tooltip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

export default function PerfilPublico() {
  // Tela criada para a visualização e compartilhamento do portfólio para o público
  // será incluída na versão 2.0

  const id = getId()
  const [projetos, setProjetos] = useState([]);
  const [user, setUser] = useState([]);

  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    api.get(`/projects/user/${id}`).then((response) => {
        setProjetos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    api.get(`/users/${id}`).then((response) => {
        setUser(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [id]);


  // const [openModal, setOpenModal] = useState(null);
  // const [selectedCardId, setSelectedCardId] = useState(null);
  // const handleCloseModal  = () => {
  //   setOpenModal(false);
  // };

  // const handleOpenModal = (cardId) => {
  //   setSelectedCardId(cardId);
  //   setOpenModal(true)
  // }

  const formatDate = (fullDate) => {
    const date = new Date(fullDate);
    const options = { year: 'numeric', month: '2-digit' };
    return date.toLocaleDateString('pt-BR', options);
}

  // tags apresentadas vinculadas ao perfil e com filtro
    const userTags = projetos ? projetos.flatMap((projeto) => projeto.tags) : [];
    const tagCounts = userTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});
    
    const duplicateTags = Object.entries(tagCounts)
      .filter(([tag, count]) => count > 1).map(([tag]) => tag);
    
    const uniqueUserTags = Array.from(new Set(userTags));
    const filteredUserTags = uniqueUserTags.filter((tag) => duplicateTags.includes(tag));

  // ===================================================

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
            <Typography variant="h5">
              {user?.name} {user?.lastName}
            </Typography>
            <Typography variant="subtitle1">{user?.country}</Typography>
        </div>
      </section>
        <div className={styles.principaisTags}>
        <Tooltip title="as Tags mais utilizadas por esse usuário aparecerão aqui" >
          <span style={{display: 'flex'}}>
            <InfoIcon />
            <h3>Principais tags: </h3>
          </span>
        </Tooltip>
            {filteredUserTags.map((tag, index) => (
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
               <div key={projeto._id} className={styles.card}
                // onClick={() => handleOpenModal(projeto)}
                >
                    <img src={showImg(projeto.projectImage)} alt="" className={styles.imgProject}/>

                    <div className={styles.infoContainer}>
                      <span>
                          <img src={showAvatar(user.avatar)} className={styles.avatar} alt="" />
                          <p>{`${user.name} ${user.lastName} • ${formatDate(projeto.createdAt)}`}</p>
                      </span>
                      <Tooltip title={projeto?.tags?.join(' ') || ''}>
                        <span>
                          {projeto?.tags.slice(0,2).map((tag, index) => (
                            <Chip label={tag} key={index}  />
                            ))}
                        </span>
                      </Tooltip>

                    </div>
               </div>
              ))}
          </div>
        )}

        {/* <ModalPreview 
            open={openModal} 
            handleClose={handleCloseModal} 
            card={projetos.find(card => card._id === selectedCardId)}
            user={user} /> */}
    </>
  )
}