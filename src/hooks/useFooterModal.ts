import { useState } from "react";

export const useFooterModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [socialMedia, setSocialMedia] = useState("");

  const openModal = (social) => {
    setSocialMedia(social);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUrl("");
  };

  const saveLink = () => {
    const userDatas = JSON.parse(localStorage.getItem("Userdatas")) || [];
    const idUsuario = JSON.parse(localStorage.getItem("idUser"));
    const userIndex = userDatas.findIndex(
      (u) => u.UserName === idUsuario.Username
    );

    const formattedUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;

    if (userDatas[userIndex]) {
      userDatas[userIndex].UserLinks[socialMedia] = formattedUrl;
      localStorage.setItem("Userdatas", JSON.stringify(userDatas));
    }
    closeModal();
  };

  return {
    isModalOpen,
    url,
    socialMedia,
    setUrl,
    openModal,
    closeModal,
    saveLink,
  };
};
