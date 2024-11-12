import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoggedOut from "./components/LoggedOut";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loggedout" element={<LoggedOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
