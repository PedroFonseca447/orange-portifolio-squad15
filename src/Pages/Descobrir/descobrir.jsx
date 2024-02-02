import style from './descobrir.module.css';

import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Autocomplete, TextField,Typography } from "@mui/material";

import { cardsData } from '../../components/cardsData';
import Menu from '../../components/Menu/Menu'; 
import ModalProjeto from './ModalProjeto/modal';
import { api } from '../../services/api';

export default function Descobrir() {

    const [projeto, setProjeto] = useState([]);
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const navigate = useNavigate();

    const handleOpenModal = (cardId) => {
        setSelectedCardId(cardId);
        setOpenModal(true);
    };

    const handleClose = () => {
        setSelectedCardId(null);
        setOpenModal(false);
    };

// define qual tela abrir dependendo da resolução
    const handleImageClick = (cardId) => {
        if (window.innerWidth <= 500) {
          navigate(`/descobrir/${cardId}`);
        } else {
          handleOpenModal(cardId);
        }
      };

      useEffect(() => {
        try {
          api.get(`/projects`).then((response) => {
              console.log("Response:", response.data);
              setProjeto(response.data);
          })
        } catch (error) {
          console.error('Erro ao buscar informações do usuário ou projetos:', error);
        }
  
    }, []);


    return(
        <>
            <Menu />

            <div className={style.conteudo}>
                <Typography variant='h4' align='center' padding={'20px'}>
                Junte-se à comunidade de inovação, inspiração e descobertas, transformando experiências em conexões inesquecíveis
                </Typography>
                <br />

                {/* input das tags */}
                <Autocomplete
                    multiple
                    id="tags-outline"
                    options={tags ? [...tags, tag] : [tag]}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    defaultValue={tags || []}
                    onChange={(e, newValue) => setTags(newValue)}
                    sx={{width: '100%',
                        maxWidth: '60%',}}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        id="outline"
                        label="Buscar tags"
                        placeholder="Buscar tags"
                        onChange={(e) => setTag(e.target.value)}
                        sx={{width: '100%'}}
                        />
                )}
                />
                <br /><br />
                {/* ============ */}
                <div className={style.cardList}>
                    {projeto.map((card) => (
                        <div  key={card._id} onClick={() => handleImageClick(card._id)}>
                            <div className={style.card} >
                                <img src={card.projectImage} alt=""/>
                                    <div className={style.infoContainer}>
                                        <span>
                                            <img src={card.avatar} className={style.user} alt="" />
                                            <p>{`${card.name} ${card.lastName} • ${card.createdAt}`}</p>
                                        </span>
    
                                        {/* mobile */}
                                        <div className={style.tagsMobile}>
                                            {card.tags.map((tag, index) => (
                                                <React.Fragment key={index}>
                                                    <span className='tag'>{tag}</span>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        {/* ===== */}
                                    </div>
                            </div>
                        </div>  
                    ))}
                </div>
            </div>
                <ModalProjeto open={openModal} handleClose={handleClose} cardId={selectedCardId} />
        </>
    )
}