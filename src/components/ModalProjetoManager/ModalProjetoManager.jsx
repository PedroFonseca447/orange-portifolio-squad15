import React, { useState, useEffect } from "react";
import styles from "./modalprojetomanager.module.css";
import { showImg } from "../functions";
import { TextField, Autocomplete, Modal } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import Alert from "../Alert/Alert";
import { createFilterOptions } from "@mui/material";

const filter = createFilterOptions();


const ModalProjetoManager = ({
  projeto,
  onCloseModal,
  onSaveCard,
  showPreviewCard,
}) => {
  const [data, setData] = useState(
    projeto || {
      title: "",
      projectImage: "",
      tags: [],
      description: "",
      urlGithub: "",
    }
  );
  const [tag, setTag] = useState("");
  const [alert, setAlert] = useState(null);

  const saveCard = () => {
    if (
      data &&
      Object.keys(data)?.every(
        (value) =>
          data[value] !== "" && data[value] !== null && data[value].lenght !== 0
      )
    ) {
      onSaveCard(data);
    } else {
      setAlert(<Alert message={"Preencha todos os campos"} sucess={false} />);
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  return (
    <Modal
      open={true}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <>
        {alert}
        <section className={styles.modalProjeto}>
          <h5>Adicionar projeto</h5>
          <section className={styles.modalProjeto__form}>
            <div className={styles.form__upload}>
              <p>Selecione o conteúdo que você deseja fazer upload</p>
              {!data?.projectImage ? (
                <label
                  htmlFor="form__uploadImg"
                  className={styles.form__uploadImg}
                >
                  <div className={styles.uploadImg__container}>
                    <CollectionsIcon
                      className={styles.uploadImg__icon}
                      sx={{
                        width: "46px",
                        height: "46px",
                        flexShrink: 0,
                        color: "#323232",
                      }}
                    />
                    <p>Compartilhe seu talento com milhares de pessoas</p>
                  </div>
                </label>
              ) : (
                <label htmlFor="form__uploadImg" className={styles.form__img}>
                  <img src={showImg(data?.projectImage)}
                    alt={`Projeto ${data?.title}`}
                  />
                </label>
              )}
              <input
                type="file"
                name="form__upload-img"
                className={styles.form__uploadImgInput}
                id={"form__uploadImg"}
                onChange={(e) =>
                  setData({ ...data, projectImage: e.target.files[0] })
                }
              />
            </div>
            <div className={styles.form__inputs}>
              <TextField
                id="outline"
                label="Titulo"
                defaultValue={data?.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
               <Autocomplete
                multiple
                limitTags={4}
                id="tags-outline"
                options={[...new Set([...data?.tags, tag])] || []}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                value={data?.tags || []}
                onChange={(e, newValue) => setData({ ...data, tags: newValue })}
                renderOption={(props, option) => <li {...props} key={option}>{option}</li>}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="outline"
                    label="Tags"
                    placeholder="Tags"
                    onChange={(e) => setTag(e.target.value)}
                  />
                )}
              />
              <TextField
                id="outline"
                label="Link"
                defaultValue={data?.urlGithub}
                onChange={(e) =>
                  setData({ ...data, urlGithub: e.target.value })
                }
              />
              <TextField
                id="outline"
                label="Descrição"
                multiline
                rows={4}
                defaultValue={data?.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </div>
          </section>
          <div className={styles.modalProjeto__actions}>
            <p
              className={styles.modalProjeto__visualizar}
              onClick={() => showPreviewCard(data)}
            >
              Visualizar publicação
            </p>
            <div className={styles.modalProjeto__actionsButtons}>
              <button
                className={styles.actions__salvarProjeto}
                onClick={saveCard}
              >
                Salvar
              </button>
              <button
                className={styles.actions__cancelarProjeto}
                onClick={onCloseModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </section>
      </>
    </Modal>
  );
};

export default ModalProjetoManager;
