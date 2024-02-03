import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Chip  } from '@mui/material';

import styles from './detalhes.module.css'

import Menu from '../../../components/Menu/Menu';
import { showAvatar, showImg } from '../../../components/functions';
import { api } from '../../../services/api';

export default function DetalhesMobile() {

    const { id } = useParams();
    const [cardSelecionado, setCardSelecionado] = useState(null);

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
          } catch (error) {
            console.error('Erro ao buscar o projeto:', error);
          }

      }, [id]);

    return (
        <div>
            <Menu />
            {/* tela para visualização de informações do projeto para mobile */}
                {cardSelecionado && (
                    <div className={styles.container}>
                        <h1>{cardSelecionado.title}</h1>
                        <img src={showImg(cardSelecionado.projectImage)} alt="" className={styles.imgProjeto}/>

                        <div className='infos'>
                            <img src={showAvatar(cardSelecionado.avatar)} alt="avatar" className={styles.foto_usuario} sizes='100'/>
                            <p>{`${cardSelecionado.name} ${cardSelecionado.lastName} • ${formatDate(cardSelecionado.createdAt)}`}</p>
                            <div>
                            {cardSelecionado.tags.map((tag, index) => (
                                <Chip label={tag} key={index} />
                            ))}
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
