import React from "react";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaYoutubeSquare } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";
import { useFooterModal } from "../hooks/useFooterModal";
import "./css/Footer.css";

function Footer({ edit }) {
  const {
    isModalOpen,
    url,
    socialMedia,
    setUrl,
    openModal,
    closeModal,
    saveLink,
  } = useFooterModal();

  const handleIconClick = (platform) => {
    const userDatas = JSON.parse(localStorage.getItem("Userdatas")) || [];
    const idUsuario = JSON.parse(localStorage.getItem("idUser"));
    const userIndex = userDatas.findIndex(
      (u) => u.UserName === idUsuario.Username
    );

    if (userDatas[userIndex]) {
      const link = userDatas[userIndex].UserLinks[platform];
      if (link) {
        window.open(link, "_blank");
      } else {
        alert("Link não configurado para esta rede social.");
      }
    }
  };

  return (
    <section id="footer">
      <FooterContent
        handleIconClick={handleIconClick}
        openModal={openModal}
        edit={edit}
      />
      {isModalOpen && (
        <Modal
          url={url}
          setUrl={setUrl}
          saveLink={saveLink}
          closeModal={closeModal}
        />
      )}
    </section>
  );
}

const FooterContent = ({ handleIconClick, openModal, edit }) => (
  <>
    <p id="footer-title">
      Assim que possível, me envie um email para que possamos trabalhar felizes
      juntos!
    </p>
    <div id="socialMedia">
      {["instagram", "facebook", "twitter", "youtube"].map((platform) => (
        <SocialMediaIcon
          key={platform}
          platform={platform}
          handleIconClick={handleIconClick}
          openModal={openModal}
          edit={edit}
        />
      ))}
    </div>
    <div id="endInfo">
      <p>
        <FaMapMarkerAlt /> Brasil
      </p>
      <p>© 2024, All Rights By Compass UOL</p>
    </div>
  </>
);

const SocialMediaIcon = ({ platform, handleIconClick, openModal, edit }) => (
  <div
    className={`icons ${platform}`}
    onClick={() => handleIconClick(platform)}
  >
    {edit && (
      <HiPencil
        style={{ transform: "translateY(-150%)", marginLeft: "80px" }}
        color="white"
        className="iconsEdit"
        onClick={(e) => {
          e.stopPropagation();
          openModal(platform);
        }}
      />
    )}
    {platform === "instagram" && <FaSquareInstagram size={"72px"} />}
    {platform === "facebook" && <FaSquareFacebook size={"72px"} />}
    {platform === "twitter" && <FaSquareTwitter size={"72px"} />}
    {platform === "youtube" && <FaYoutubeSquare size={"72px"} />}
  </div>
);

const Modal = ({ url, setUrl, saveLink, closeModal }) => (
  <div className="modal-footer">
    <div
      className="modal-footer-content"
      style={{ width: "867px", height: "424px" }}
    >
      <h2
        style={{
          width: "88%",
          color: "black",
          fontWeight: "800",
          fontSize: "48px",
        }}
      >
        Adicionar Link
      </h2>
      <input
        style={{
          width: "739px",
          height: "72px",
          margin: "32px 0 32px 0",
          borderRadius: "8px",
        }}
        type="url"
        placeholder="Digite a URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="modal-footer-buttons">
        <button
          style={{ marginRight: "24px" }}
          className="cancelButton"
          onClick={closeModal}
        >
          Cancelar
        </button>
        <button className="saveButton" onClick={saveLink}>
          Salvar
        </button>
      </div>
    </div>
  </div>
);

export default Footer;
