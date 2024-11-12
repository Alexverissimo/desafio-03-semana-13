// Experiences.js
import React from "react";
import "./css/Logged.css";
import { CgAdd } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";
import { TbTrashFilled } from "react-icons/tb";
import Modal from "./Modal";
import { useExperiencesLogic } from "../hooks/useExperiencesLogic";

function Experiences({ edit }) {
  const {
    isModalOpen,
    takeStorage,
    selectedExperience,
    setSelectedExperience,
    openModal,
    closeModal,
    handleDeleteExperience,
    updateStorage,
  } = useExperiencesLogic();

  const ensureAbsoluteUrl = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div>
      <section id="experiences">
        <p id="title-exp">Experiências</p>
        {takeStorage.Experiences && takeStorage.Experiences.length > 0 ? (
          ""
        ) : (
          <p
            style={{
              fontWeight: "400",
              fontSize: "40px",
              color: "#D1D5DB",
            }}
          >
            não há nada por aqui
          </p>
        )}
        <div className="cardsexp">
          {edit && (
            <div
              className="addExp"
              onClick={() => {
                setSelectedExperience(null);
                openModal();
              }}
            >
              <CgAdd className="addIcon" size={90} />
              <p style={{ marginTop: "16px" }}>Adicionar Card</p>
            </div>
          )}

          {takeStorage.Experiences && takeStorage.Experiences.length > 0
            ? takeStorage.Experiences.map((datasStorages, index) => (
                <div key={index} className="newexperience">
                  <div className="cards">
                    <p
                      className="project-tittle"
                      style={{
                        fontSize: "32px",
                        fontWeight: "800",
                        margin: "32px 0 16px 0",
                        marginLeft: "32px",
                      }}
                    >
                      {datasStorages.title}
                    </p>
                    <p
                      className="time"
                      style={{
                        fontSize: "20px",
                        color: "#D1D5DB",
                        marginBottom: "16px",
                        marginLeft: "32px",
                      }}
                    >
                      {datasStorages.period}
                    </p>
                    <div className="tag">
                      {datasStorages.skills.map((tags, index) => (
                        <div key={index} className="tags">
                          {tags}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="projectDescription">
                        {datasStorages.description}
                      </p>
                    </div>
                    {datasStorages.repository ? (
                      <a
                        className="repo"
                        href={ensureAbsoluteUrl(datasStorages.repository)}
                        target="_blank"
                      >
                        Ver repositorio
                      </a>
                    ) : (
                      ""
                    )}
                    {edit ? (
                      <div className="mouseEdit">
                        <div
                          className="editHistorys"
                          onClick={() => {
                            setSelectedExperience(datasStorages);
                            openModal();
                          }}
                        >
                          <AiFillEdit />
                        </div>
                        <div
                          className="editHistorys"
                          onClick={() =>
                            handleDeleteExperience(datasStorages.title)
                          }
                        >
                          <TbTrashFilled />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))
            : ""}

          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            updateStorage={updateStorage}
            data={selectedExperience}
          />
        </div>
      </section>
    </div>
  );
}

export default Experiences;
