import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import { cardsData } from '../../components/cardsData';
import Menu from '../../components/Menu/Menu'; 
import ModalProjeto from '../Descobrir/ModalProjeto/modal';
import style from  './perfilPublico.module.css';

// import userService from '../../services/user';
import { api } from '../../services/api';

import { Autocomplete, Chip, TextField } from "@mui/material";

export default function PerfilPublico() {

    const [userInfo, setUserInfo] = useState({});
    const [projetos, setProjetos] = useState([]);
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const [openModal, setOpenModal] = useState(false); 
    const [selectedProjeto, setSelectedProjeto] = useState(null);
    const { id } = useParams();

    const handleOpenModal = (projeto) => {
        setSelectedProjeto(projeto);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProjeto(null);
        setOpenModal(false);
    };

    useEffect(() => {

        api.get(`/users/${id}`).then((response) => {
            setUserInfo(response.data);
        }).catch((err) => {
            console.log("não foi possivel acessar os dados", err);
        })
      }, [id]);
      

    const userTags = projetos ? projetos.flatMap((projeto) => projeto.tags) : [];
    const uniqueUserTags = Array.from(new Set(userTags));

    return(
        <div>
            <Menu />
            <div className={style.content}>
                <section className={style.infoPerfil}>
                    <img
                    src={userInfo.avatar}
                    alt="Sua foto de perfil"
                    />
                    <div className={style.container}>
                        <div className={style.infoUser}>
                            <h3>
                            {userInfo.name} {userInfo.lastName}
                            </h3>
                            <span>{userInfo.country}</span>
                        </div>
                    </div>
                </section>
                    <div className={style.principaisTags}>
                        <h3>Principais tags: </h3>
                        {uniqueUserTags.map((tag, index) => (
                            <Chip label={tag} key={index} sx={{alignSelf: 'center'}}/>
                        ))}
                    </div>
                    <br /><br />
                {/*input */}
                <Autocomplete
                    multiple
                    id="tags-outline"
                    options={tags ? [...tags, tag] : [tag]}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    defaultValue={tags || []}
                    onChange={(e, newValue) => setTags(newValue)}
                    sx={{width: window.innerWidth <= 500 ? '100%' : '60%',
                        maxWidth: '100%',}}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        id="outline"
                        label="Buscar tags"
                        placeholder="Buscar tags"
                        onChange={(e) => setTag(e.target.value)}
                        sx={{width: '60%',
                        ...(window.innerWidth <= 500 && { maxWidth: '100%' }),}}
                        />
                        )}
                />
                {/* ==== */}
                <div className="cards">
                    {projetos.length > 0 ? (
                        projetos.map((projeto) => (
                            <div key={projeto._id} className={style.card} onClick={() => handleOpenModal(projeto)}>
                                <img src={projeto.projectImage} alt="" />
                                <div className={style.infoContainer}>
                                    <span>
                                        <img src={projeto.avatar} className={style.user} alt="" />
                                        <p>{`${projeto.name} ${projeto.lastName} • ${projeto.createdAt}`}</p>
                                    </span>

                                    <div className={style.tags}>
                                        {projeto.tags.map((tag, index) => (
                                            <Chip label={tag} key={index} sx={{ alignSelf: 'center', gap: '5px' }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>

            {selectedProjeto && (
                <ModalProjeto
                    open={openModal}
                    handleClose={handleCloseModal}
                    cardId={selectedProjeto._id}
                />
            )}
        </div>
    )
}