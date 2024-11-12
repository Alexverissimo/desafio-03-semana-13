import { useState, useEffect } from "react";

export const useModalLogic = (isOpen, data, updateStorage, onClose) => {
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [repository, setRepository] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      if (data) {
        setTitle(data.title);
        setPeriod(data.period);
        setSkills(data.skills.join(", "));
        setDescription(data.description);
        setRepository(data.repository || "");
      } else {
        setTitle("");
        setPeriod("");
        setSkills("");
        setDescription("");
        setRepository("");
      }
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, data]);

  const handleSetLocalStorage = () => {
    const newExperience = {
      title,
      period,
      skills: skills.split(",").map((skill) => skill.trim()),
      description,
      repository,
    };

    const users = JSON.parse(localStorage.getItem("Userdatas")) || [];
    const idUsuario = JSON.parse(localStorage.getItem("idUser"));
    const userIndex = users.findIndex((u) => u.UserName === idUsuario.Username);
    if (userIndex === -1) return;

    if (data) {
      users[userIndex].Experiences = users[userIndex].Experiences.map((exp) =>
        exp.title === data.title ? newExperience : exp
      );
    } else {
      users[userIndex].Experiences.push(newExperience);
    }

    localStorage.setItem("Userdatas", JSON.stringify(users));

    updateStorage();
    onClose();
  };

  const isFormValid = title && period && skills && description;

  return {
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
  };
};
