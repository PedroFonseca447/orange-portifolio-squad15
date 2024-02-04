import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Chip, Typography, Tooltip } from '@mui/material';

import styles from './detalhes.module.css'

import Menu from '../../../components/Menu/Menu';
import { showAvatar, showImg } from '../../../components/functions';
import { api } from '../../../services/api';

export default function DetalhesMobile() {

    const { id } = useParams();
    const [cardSelecionado, setCardSelecionado] = useState(null);
    const [user, setUser] = useState(null);

    // formatação para data
    const formatDate = (fullDate) => {
        const date = new Date(fullDate);
        const options = { year: 'numeric', month: '2-digit' };
        return date.toLocaleDateString('pt-BR', options);
    }

    useEffect(() => {

          try {
            api.get(`/projects/${id}`).then((response) => {
                setCardSelecionado(response.data);
            })
            api.get(`/users`).then((response) => {
                setUser(response.data);
            })
          } catch (error) {
            console.error('Erro ao buscar o projeto:', error);
          }

      }, [id]);

    return (
        <div>
            <Menu />
            {/* tela para visualização de informações do projeto para mobile */}
                {cardSelecionado && user && (
                    <div className={styles.container}>
                        <Typography variant='h4' align='center' padding={'20px'}>
                            {cardSelecionado.title}
                        </Typography>

                        <img src={showImg(cardSelecionado.projectImage)} alt="" className={styles.imgProjeto}/>

                        <div className={styles.infos}>
                            <img src={showAvatar(user.avatar)} alt="avatar" className={styles.foto_usuario} sizes='100'/>
                            <p>
                                {`${user.find((user) => user._id === cardSelecionado.user).name} 
                                ${user.find((user) => user._id === cardSelecionado.user).lastName} 
                                • ${formatDate(cardSelecionado.createdAt)}`}
                            </p>
                            <div>
                            <Tooltip title={cardSelecionado?.tags?.join(' ')}>
                                {cardSelecionado.tags.slice(0,2).map((tag, index) => (
                                    <Chip label={tag} key={index} />
                                ))}
                            </Tooltip>
                            </div>
                        </div>

                        <p>{cardSelecionado.description}</p>
                        <p>Download</p>
                        <a href={cardSelecionado.urlGithub}>{cardSelecionado.urlGithub}</a>
                    </div>

                )}
        </div>
    );
}
