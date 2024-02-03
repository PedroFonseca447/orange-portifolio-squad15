import React from "react";

import Menu from '../Menu/Menu'
import { showAvatar, showImg } from "../functions";
import { Modal, Box, IconButton, Chip, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import styles from "./modalpreview.module.css";
import { ArrowBack } from "@mui/icons-material";

const ModalPreview = ({ handleClose, card }) => {
  console.log('Total card',card);

  const newDate = card?.createdAt ? new Date(card?.createdAt) : new Date()

  const date = `${(newDate.getMonth()+1).toString().padStart(2, '0')}/${newDate.getFullYear().toString().substr(2)}`
  return (
    <>
      <main className={styles.backgroundModal}>
        <section className={styles.modalPreview}>
          <Box
            sx={{
              width: "90%",
              display: "flex",
              justifyContent: window.innerWidth > 850 ? "flex-end" : "flex-start",
              alignItems: "flex-end",
              marginLeft: window.innerWidth > 850 ? 0 : '20px'
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              {window.innerWidth > 850 ? <CloseIcon sx={{ color: "#323232" }} /> :
              <ArrowBack sx={{ color: "#323232" }} />}
            </IconButton>
          </Box>
          <div className={styles.modalContent}>
            <h3>{card?.title}</h3>
            <div className={styles.modalContentInfoImg}>
              <div className={styles.HorizontalContainer}>
                <div className={styles.informacoes}>
                  <img
                    src={
                      showAvatar(card?.avatar)
                    }
                    alt="Foto de perfil"
                  />
                  <p>
                    <b>{card?.name} {card?.lastName}</b>
                    {date}
                  </p>
                </div>

                <h3>{card?.title}</h3>

                <Tooltip title={card?.tags?.join(', ')}>
                  <div className={styles.tags}>
                    {card?.tags.slice(0,2).map((tag, index) => (
                      <Chip label={tag} key={index} />
                    ))}
                  </div>
                </Tooltip>
              </div>
                <img
                  src={
                    showImg(card?.projectImage)
                  }
                  alt={`Projeto ${card?.title}`}
                  sizes="100"
                />
            </div>
            <div className={styles.projeto}>
              <p>{card?.description}</p>
              <p>Download</p>
              <a href={card?.urlGithub}>{card?.urlGithub}</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ModalPreview;