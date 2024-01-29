import React from "react";

import { Modal, Box, IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./modalpreview.module.css";

const ModalPreview = ({ handleClose, card }) => {
  return (
    <>
      <Modal
        open={true}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <section className={styles.modalPreview}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon sx={{ color: "#323232" }} />
            </IconButton>
          </Box>
          <div className={styles.modalContent}>
            <div className={styles.HorizontalContainer}>
              <div className={styles.informacoes}>
                <img
                  src={
                    typeof card?.avatar === "object"
                      ? URL.createObjectURL(card?.avatar)
                      : card?.avatar
                  }
                  alt="Foto de perfil"
                />
                <p>
                  {card?.name} {card?.lastName}
                  <br /> {card?.createdAt}
                </p>
              </div>

              <h3>{card?.title}</h3>

              <div className={styles.tags}>
                {card?.tags.map((tag, index) => (
                  <Chip label={tag} key={index} />
                ))}
              </div>
            </div>
            <div className={styles.projeto}>
              <img
                src={
                  typeof card?.projectImage === "object"
                    ? URL.createObjectURL(card?.projectImage)
                    : card?.projectImage
                }
                alt={`Projeto ${card?.title}`}
                sizes="100"
              />

              {/* mobile */}
              <div className={styles.informacoesResponsive}>
                <img src={card?.avatar} alt="Foto de perfil" />
                <p>{`${card?.name} ${card?.lastName} • ${card?.createdAt}`}</p>

                <div className={styles.tagsResponsive}>
                  {card?.tags.map((tag, index) => (
                    <Chip label={tag} key={index} />
                  ))}
                </div>
              </div>
              {/* ====== */}

              <p>{card?.description}</p>
              <p>Download</p>
              <a href={card?.urlGithub}>{card?.urlGithub}</a>
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
};

export default ModalPreview;
