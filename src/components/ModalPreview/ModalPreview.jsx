import React from "react";

import { Modal, Box, IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "./modalpreview.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  height: window.innerWidth <= 400 ? "100vh" : "70vh",
  bgcolor: "background.paper",
  overflowY: "auto",
  boxShadow: 24,
  p: 4,
  padding: 10,
  margin: 0,
};

const styleBtn = {
  position: "absolute",
  top: 10,
  right: 15,
  color: "#323232",
};

const ModalPreview = ({ handleClose, card }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={styleBtn}
          >
            <CloseIcon />
          </IconButton>
          <div className="modal-content">
            <div className="Horizontal-container">
              <div className="informacoes">
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

              <div className="tags">
                {card?.tags.map((tag, index) => (
                  <Chip label={tag} key={index} />
                ))}
              </div>
            </div>
            <div className="projeto">
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
              <div className="informacoes-responsive">
                <img src={card?.avatar} alt="Foto de perfil" />
                <p>{`${card?.name} ${card?.lastName} • ${card?.createdAt}`}</p>

                <div className="tags-responsive">
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
        </Box>
      </Modal>
    </>
  );
};

export default ModalPreview;
