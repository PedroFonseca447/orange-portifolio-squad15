import style from './descobrir.module.css';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { Autocomplete, TextField, Typography, Chip, Tooltip } from "@mui/material";

// import { cardsData } from '../../components/cardsData';
import { showAvatar, showImg } from '../../components/functions';
import Menu from '../../components/Menu/Menu'; 
import ModalProjeto from './ModalProjeto/modal';
import { api } from '../../services/api';

export default function Descobrir() {

    // const [user, setUser] = useState([]);
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
        setSelectedCardId(cardId);
          handleOpenModal(cardId);
        }
      };

      useEffect(() => {
        try {
            api.get(`/projects/`).then((response) => {
                setProjeto(response.data);
            })

        //   api.get(`/users/`).then((response) => {
        //       setUser(response.data);
        //   })

        } catch (error) {
          console.error('Erro ao buscar informações do usuário ou projetos:', error);
        }
  
    }, []);

    // função para filtrar as tags de acordo com o que o input receber
    const filtro = 
            projeto.filter((project) => 
               tags.length === 0  || project.tags.some((tagProjeto) => 
                    tags.some((tagsearch) => 
                        tagsearch.toLowerCase() === tagProjeto.toLowerCase()))
            )

    const formatDate = (fullDate) => {
        const date = new Date(fullDate);
        const options = { year: 'numeric', month: '2-digit' };
        return date.toLocaleDateString('pt-BR', options);
    }

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
                    limitTags={4}
                    id="tags-outline"
                    options={[...new Set([...tags, tag])] || []}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    value={tags || []}
                    onChange={(e, newValue) => setTags(newValue)}
                    sx={{maxWidth: '513px', marginBottom: 1}}
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

                <div className={style.cardList}>
                    {filtro.map((card) => (
                        <div  key={card._id} onClick={() => handleImageClick(card._id)}>
                            <div className={style.card} >
                                <img src={showImg(card.projectImage)} alt=""/>
                                    <div className={style.infoContainer}>
                                        <span>
                                            <img src={showAvatar(card.avatar)} className={style.user} alt="" />
                                            <p>{`${card.name} ${card.lastName} • ${formatDate(card.createdAt)}`}</p>
                                        </span>
    
                                        {/* mobile */}
                                        <Tooltip title={card?.tags?.join(' ')}>
                                            <div className={style.tagsMobile}>
                                                {card?.tags.slice(0,2).map((tag, index) => (
                                                <Chip label={tag} key={index} />
                                                ))}
                                            </div>
                                        </Tooltip>
                                        {/* ===== */}
                                    </div>
                            </div>
                        </div>  
                    ))}
                </div>
            </div>

                <ModalProjeto open={openModal} handleClose={handleClose} card={projeto.find(card => card._id === selectedCardId)} />
        </>
    )
}