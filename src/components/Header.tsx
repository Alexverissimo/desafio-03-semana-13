import { useNavigate } from "react-router-dom";
import "./css/Logged.css";
import { GrLogin } from "react-icons/gr";
function Header({ test }) {
  const isloguin = JSON.parse(localStorage.getItem("isLogin"));

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("idUser");
    localStorage.removeItem("previousSearches");
    localStorage.removeItem("isLogin");
    navigate("/");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header id="log-header">
      <nav id="menu">
        <ul className="nav-list">
          <li onClick={() => scrollToSection("inicio")}>Início</li>
          <li onClick={() => scrollToSection("history")}>Minha história</li>
          <li onClick={() => scrollToSection("experiences")}>Experiências</li>
          <li onClick={() => scrollToSection("email")}>Contato</li>
          <li id="log-last" onClick={handleLogout}>
            {isloguin ? (
              "sair"
            ) : (
              <div style={{ display: "flex", gap: "8px" }}>
                <GrLogin />
                Entrar
              </div>
            )}
          </li>
          <figure>
            {isloguin ? <img className="header-img" src={test} alt="" /> : ""}
          </figure>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
