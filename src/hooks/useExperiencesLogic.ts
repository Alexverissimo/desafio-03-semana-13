
import { useState, useEffect, useCallback } from "react";

export function useExperiencesLogic() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [takeStorage, setTakeStorage] = useState({});
  const [selectedExperience, setSelectedExperience] = useState(null);

  const users = JSON.parse(localStorage.getItem("Userdatas")) || [];
  const idUsuario = JSON.parse(localStorage.getItem("idUser"));
  const userIndex = users.findIndex((u) => u.UserName === idUsuario.Username);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Userdatas")) || [];
    setTakeStorage(storedData[userIndex] || {});
  }, [userIndex]);

  const updateStorage = useCallback(() => {
    const storedData = JSON.parse(localStorage.getItem("Userdatas")) || [];
    setTakeStorage(storedData[userIndex] || {});
  }, [userIndex]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  }, []);

  const handleDeleteExperience = useCallback(
    (title) => {
      if (takeStorage.Experiences) {
        const updatedExperiences = takeStorage.Experiences.filter(
          (experience) => experience.title !== title
        );

        const updatedStorage = {
          ...takeStorage,
          Experiences: updatedExperiences,
        };
        localStorage.setItem("Userdatas", JSON.stringify([updatedStorage]));
        setTakeStorage(updatedStorage);
      }
    },
    [takeStorage]
  );

  return {
    isModalOpen,
    takeStorage,
    selectedExperience,
    setSelectedExperience,
    openModal,
    closeModal,
    handleDeleteExperience,
    updateStorage,
  };
}
