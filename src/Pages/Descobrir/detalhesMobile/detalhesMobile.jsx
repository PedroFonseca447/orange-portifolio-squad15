import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './detalhes.css'

import { cardsData } from '../../../components/cardsData';
import Menu from '../../../components/Menu/Menu';

export default function DetalhesMobile() {

    const { id } = useParams();
    const cardId = parseInt(id, 10);
    const cardSelecionado = cardsData.find((card) => card.id === cardId);

    return (
        <div>
            <Menu />
                {cardSelecionado && (
                    <div className='container'>
                        <h1>{cardSelecionado.titulo}</h1>
                        <img src={cardSelecionado.cardImagem} alt="" className='imgProjeto'/>

                        <div className='infos'>
                            <img src={cardSelecionado.usuario} alt="avatar do usuario" className='foto-usuario' sizes='100'/>
                            <p>{`${cardSelecionado.nome} • ${cardSelecionado.data}`}</p>
                            <div>
                                {cardSelecionado.tags.map((tag, index) => (
                                    <span key={index} className='tag'>{tag}</span>
                                ))}
                            </div>
                        </div>

                        <p>{cardSelecionado.descricao}</p>
                        <p>Download</p>
                        <a href={cardSelecionado.link}>{cardSelecionado.link}</a>
                    </div>

                )}
        </div>
    );
}
