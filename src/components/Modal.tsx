import React from "react";
import "../components/css/Modal.css";
import { useModalLogic } from "../hooks/useModalLogic";

function Modal({ isOpen, onClose, data, updateStorage }) {
  const {
    title,
    period,
    skills,
    description,
    repository,
    setTitle,
    setPeriod,
    setSkills,
    setDescription,
    setRepository,
    handleSetLocalStorage,
    isFormValid,
  } = useModalLogic(isOpen, data, updateStorage, onClose);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{data ? "Editar Experiência" : "Adicionar Experiência"}</h2>
        <input
          required
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          required
          type="text"
          placeholder="Período de atuação"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />
        <input
          required
          type="text"
          placeholder="Habilidades (Separar por vírgula)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <textarea
          maxLength={188}
          required
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "739px", height: "281px" }}
        />
        <input
          required
          type="text"
          placeholder="Repositório (opcional)"
          value={repository}
          onChange={(e) => setRepository(e.target.value)}
        />
        <div style={{ display: "flex", gap: "32px", marginTop: "32px" }}>
          <button
            onClick={onClose}
            style={{ color: "black", border: "1px solid" }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSetLocalStorage}
            style={{
              background: isFormValid ? "#172A3A" : "#ccc",
              color: isFormValid ? "white" : "#666",
              cursor: isFormValid ? "pointer" : "not-allowed",
            }}
            disabled={!isFormValid}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
