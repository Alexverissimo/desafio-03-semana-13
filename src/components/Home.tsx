import "./css/Home.css";
import { GoArrowRight } from "react-icons/go";
import { TbBrandGithubFilled } from "react-icons/tb";
import { GoAlertFill } from "react-icons/go";
import { FaUser } from "react-icons/fa6";
import { useGithubAuth } from "../hooks/useAuth";

function Home() {
  const {
    searchText,
    searchResults,
    errorMessage,
    githubSignUp,
    handleSearch,
    handleUserClick,
  } = useGithubAuth();

  return (
    <main id="main">
      <section className="content">
        <p id="title-input">Digite o nome do usuário que deseja buscar</p>
        <section className="inputs">
          <input
            id="search"
            placeholder="Digite o nome do usuário"
            type="text"
            value={searchText}
            onChange={handleSearch}
          />
          <button id="button" disabled={!searchText}>
            <GoArrowRight className="test" />
          </button>
        </section>
        <span>
          {errorMessage ? (
            <>
              <GoAlertFill color="red" />
              {errorMessage}
            </>
          ) : (
            searchResults.map((user, index) => (
              <div
                key={index}
                className="user-suggestion"
                onClick={() => handleUserClick(user)}
                style={{ cursor: "pointer", color: "#C9CACC" }}
              >
                <FaUser style={{ margin: "0 10px 0 10px" }} />
                {user.UserName}
              </div>
            ))
          )}
        </span>
        <section id="or">
          <p className="line"></p>
          <p className="or">ou</p>
          <p className="line"></p>
        </section>
        <section id="acess">
          <p id="acess-text">Acesse sua conta com</p>
          <button onClick={githubSignUp} id="acess-btn">
            <TbBrandGithubFilled className="gitimg" size="20px" />
            GitHub
          </button>
        </section>
      </section>
    </main>
  );
}

export default Home;
