import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './detalhes.css'

import { cardsData } from '../../../components/cardsData';
import Menu from '../../../components/Menu/Menu';

export default function DetalhesMobile() {

    const { id } = useParams();
    const cardId = parseInt(id, 10);
    const cardSelecionado = cardsData.find((card) => card._id === cardId);

    return (
        <div>
            <Menu />
                {cardSelecionado && (
                    <div className='container'>
                        <h1>{cardSelecionado.title}</h1>
                        <img src={cardSelecionado.projectImage} alt={`Projeto ${cardSelecionado?.title}`} className='imgProjeto'/>

                        <div className='infos'>
                            <img src={cardSelecionado.avatar} alt={`Avatar do ${cardSelecionado?.name}`} className='foto-usuario' sizes='100'/>
                            <p>{`${cardSelecionado.name} ${cardSelecionado.lastName} • ${cardSelecionado.createdAt}`}</p>
                            <div>
                                {cardSelecionado.tags.map((tag, index) => (
                                    <span key={index} className='tag'>{tag}</span>
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
