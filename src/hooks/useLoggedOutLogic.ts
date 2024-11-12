import { useState, useCallback } from "react";
import useAxios from "./useAxios.js";
import axiosInstace from "../helper/axios-Istance.js";

export function useLoggedOutLogic() {
  const idUsuario = JSON.parse(localStorage.getItem("idUser"));
  const users = JSON.parse(localStorage.getItem("Userdatas")) || [];
  const userIndex = users.findIndex((u) => u.UserName === idUsuario.Username);
  const NameUser = users[userIndex];

  const [newEmail, setNewEmail] = useState(""); 
  const [newName, setNewName] = useState(""); 
  const handleEmailChange = (event) => {
    setNewEmail(event.target.value); 
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value); 
  };

  const [data, loading, error] = useAxios({
    axiosInstance: axiosInstace,
    method: "get",
    url: idUsuario.Username,
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const userData = JSON.parse(localStorage.getItem("Userdatas")) || [];

      const updatedUsers = userData.map((user) => {
        if (user.UserName === idUsuario.Username) {
          
          return {
            ...user,
            Name: newName, 
            UserEMail: newEmail, 
          };
        }
        return user; 
      });

 
      localStorage.setItem("Userdatas", JSON.stringify(updatedUsers));
      setIsEdit(false); 
    }
  };

  const [isEdit, setIsEdit] = useState(false);

  const handleClick = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);

  return {
    data,
    loading,
    error,
    isEdit,
    handleClick,
    idUsuario,
    setIsEdit,
    handleNameChange,
    handleKeyDown,
    newName,
    newEmail, 
    handleEmailChange, 
    NameUser,
  };
}
