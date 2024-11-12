import { useState } from "react";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebaseConfig";


export const useGithubAuth = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const githubProvider = new GithubAuthProvider();
  const auth = getAuth(app);


  const initialIsLogin = JSON.parse(localStorage.getItem("isLogin")) || false;
  const [isLogin, setIsLogin] = useState(initialIsLogin);

  const updateIsLogin = (value) => {
    setIsLogin(value);
    localStorage.setItem("isLogin", JSON.stringify(value));
  };

  const githubSignUp = () => {
    updateIsLogin(true); 
    signInWithPopup(auth, githubProvider)
      .then((response) => {
        navigate("/loggedout");
        const usuario = {
          Username: response._tokenResponse.screenName,
          userEmail: response._tokenResponse.email,
        };
        localStorage.setItem("idUser", JSON.stringify(usuario));

        const existingUsers = JSON.parse(localStorage.getItem("Userdatas")) || [];
        const isUserExists = existingUsers.some(
          (user) => user.UserName === usuario.Username
        );

        if (!isUserExists) {
          const newUser = {
            UserName: response._tokenResponse.screenName,
            Experiences: [],
            History: "",
            Name: "",
            UserEMail: "",
            UserLinks:{}
          };
          existingUsers.push(newUser);
          localStorage.setItem("Userdatas", JSON.stringify(existingUsers));
        }
      })
      .catch((error) => setErrorMessage(error.message));
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchText(query);

    if (query) {
      const usersData = JSON.parse(localStorage.getItem("Userdatas")) || [];
      const filteredUsers = usersData.filter((user) =>
        user.UserName.toLowerCase().includes(query.toLowerCase())
      );

      if (filteredUsers.length > 0) {
        setSearchResults(filteredUsers);
        setErrorMessage("");
      } else {
        setSearchResults([]);
        setErrorMessage("Usuário não encontrado");
      }
    } else {
      setSearchResults([]);
      setErrorMessage("");
    }
  };

  const handleUserClick = (selectedUser) => {
    localStorage.setItem(
      "idUser",
      JSON.stringify({ Username: selectedUser.UserName })
    );
    navigate("/loggedout");
  };

  return {
    searchText,
    searchResults,
    errorMessage,
    githubSignUp,
    handleSearch,
    handleUserClick,
    isLogin,
  };
};
