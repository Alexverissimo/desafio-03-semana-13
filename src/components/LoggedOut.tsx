import { HiPencil } from "react-icons/hi2";
import Header from "./Header";
import AddHistory from "./AddHistory.js";
import Experiences from "./Experiences.js";
import { useLoggedOutLogic } from "../hooks/useLoggedOutLogic.js";
import { IoMdCheckmark } from "react-icons/io";
import "./css/Logged.css";
import Footer from "./Footer.js";

function LoggedOut() {
  const isloguin = JSON.parse(localStorage.getItem("isLogin"));
  const {
    data,
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
  } = useLoggedOutLogic();
  const imgage = data?.avatar_url;
  const teste = NameUser.Name;
  return (
    <>
      <Header test={imgage} />
      <main id="inicio" style={{ marginTop: "250px" }}>
        {isloguin ? (
          <button id="edit" onClick={handleClick}>
            {isEdit ? (
              <IoMdCheckmark size={48} color="white" />
            ) : (
              <HiPencil color="white" size={48} />
            )}
          </button>
        ) : (
          ""
        )}

        <section id="user-data">
          <div className="user-info">
            <img id="userPicture" src={data?.avatar_url} alt="" />
            <p id="userName">{data?.login}</p>
            <p id="userCity">{data?.location}</p>
            <p id="userEmail">{idUsuario.userEmail}</p>
          </div>
          <div className="whoIm">
            <p id="im">
              Hello,
              <br /> i'm{" "}
              <span>
                {isEdit ? (
                  <input
                    id="nameEdit"
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                    onKeyDown={handleKeyDown}
                    placeholder={teste}
                  />
                ) : NameUser.Name ? (
                  NameUser.Name
                ) : (
                  "Fulano"
                )}
              </span>
            </p>
            <p id="im-description">
              {data?.bio
                ? data?.bio
                : "Acredite no seu potencial! Cada passo que você dá, por menor que seja, te aproxima dos seus sonhos. Não deixe que os desafios te façam duvidar de sua força. O melhor ainda está por vir!"}
            </p>
            <button style={{ marginRight: "26px" }} className="userInfo-btn">
              GitHub
            </button>
            {isEdit ? (
              <button className="userInfo-btn" style={{ gap: "8px" }}>
                Linkedin
                <HiPencil color="white" className="iconsEdit" />
              </button>
            ) : (
              ""
            )}
          </div>
        </section>
        <AddHistory setEdit={setIsEdit} Edit={isEdit} />
        <Experiences edit={isEdit} />
        <section id="email">
          <p id="title-email">
            Sinta-se livre para me contatar a qualquer momento!
          </p>
          {isEdit ? (
            <input
              id="addEmail"
              type="email"
              value={newEmail}
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown}
              placeholder="Adicione um email adicional"
            />
          ) : (
            <p style={{ fontSize: "64px", fontWeight: "800" }}>
              {NameUser.UserEMail}
            </p>
          )}
        </section>
      </main>
      <Footer edit={isEdit} />
    </>
  );
}

export default LoggedOut;
