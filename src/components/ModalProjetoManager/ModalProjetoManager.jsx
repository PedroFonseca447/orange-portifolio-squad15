import React, { useState, useEffect } from "react";
import "./modalprojetomanager.css";
import { TextField, Chip, Stack, Autocomplete } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";

const ModalProjetoManager = ({ projeto, onCloseModal, onSaveCard }) => {
  const [data, setData] = useState(projeto);
  const [tag, setTag] = useState("");

  const saveCard = () => {
    if (
      Object.keys(data).every(
        (value) =>
          data[value] !== "" && data[value] !== null && data[value].lenght !== 0
      )
    ) {
      onSaveCard(data);
    }
  };

  return (
    <main className="background-modal">
      <section className="modal-projeto">
        <h5>Adicionar projeto</h5>
        <section className="modal-projeto__form">
          <div className="form__upload">
            <p>Selecione o conteúdo que você deseja fazer upload</p>
            {!data?.imagem ? (
              <label htmlFor="form__upload-img" className="form__upload-img">
                <div className="upload-img__container">
                  <CollectionsIcon className="upload-img__icon" />
                  <p>Compartilhe seu talento com milhares de pessoas</p>
                </div>
              </label>
            ) : (
              <label htmlFor="form__upload-img" className="form__img">
                <img src={typeof data?.imagem === 'object' ? URL.createObjectURL(data?.imagem) : data?.imagem} alt="" />
              </label>
            )}
            <input
              type="file"
              name="form__upload-img"
              id="form__upload-img"
              onChange={(e) => setData({ ...data, imagem: e.target.files[0] })}
            />
          </div>
          <div className="form__inputs">
            <TextField
              id="outline"
              label="Titulo"
              defaultValue={data?.titulo}
              onChange={(e) => setData({ ...data, titulo: e.target.value })}
            />
            <Autocomplete
              multiple
              id="tags-outline"
              options={data?.tags ? [...data?.tags, tag] : [tag]}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              defaultValue={data?.tags || []}
              onChange={(e, newValue) => setData({ ...data, tags: newValue })}
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
              defaultValue={data?.link}
              onChange={(e) => setData({ ...data, link: e.target.value })}
            />
            <TextField
              id="outline"
              label="Descrição"
              multiline
              rows={4}
              defaultValue={data?.descricao}
              onChange={(e) => setData({ ...data, descricao: e.target.value })}
            />
          </div>
        </section>
        <div className="modal-projeto__actions">
          <p>Visualizar publicação</p>
          <div className="modal-projeto__actions-buttons">
            <button className="actions__salvar-projeto" onClick={saveCard}>
              Salvar
            </button>
            <button
              className="actions__cancelar-projeto"
              onClick={onCloseModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ModalProjetoManager;
