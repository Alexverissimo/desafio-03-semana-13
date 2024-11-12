import { useState, useEffect, useCallback } from "react";

export function useAddHistoryLogic(setEdit) {
  const [history, setHistory] = useState("");

  const idUsuario = JSON.parse(localStorage.getItem("idUser"));
  const userss = JSON.parse(localStorage.getItem("Userdatas")) || [];
  const userIndex = userss.findIndex((u) => u.UserName === idUsuario.Username);

  useEffect(() => {
    if (userIndex !== -1) {
      const savedHistory = userss[userIndex].History;
      if (savedHistory) {
        setHistory(savedHistory);
      }
    }
  }, [userIndex]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        if (userIndex !== -1) {
          userss[userIndex].History = history;
          localStorage.setItem("Userdatas", JSON.stringify(userss));
        }

        setEdit(false);
      }
    },
    [history, setEdit, userIndex, userss]
  );

  return {
    history,
    setHistory,
    handleKeyDown,
  };
}
