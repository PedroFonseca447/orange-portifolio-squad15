import React from "react";
import { Modal } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import styles from "./modalstatus.module.css";

const ModalStatus = ({ message, sucess, messageButton, action }) => {
  return (
    <Modal
      open={true}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "scroll",
      }}
    >
      <section className={styles.modalStatus}>
        <h2>{message}</h2>
        <div className={styles[`icon-status-${sucess}`]}>
          {sucess ? <CheckIcon /> : <PriorityHighIcon />}
        </div>
        <button onClick={action} className={styles.modalStatus__button}>
          {messageButton}
        </button>
      </section>
    </Modal>
  );
};

export default ModalStatus;
