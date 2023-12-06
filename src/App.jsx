import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));

  const setToken = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    setTokenState(newToken);
  };

  return (
    <BrowserRouter>
      <NavBar token={token} setToken={setToken} />
      <ApplicationViews token={token} setToken={setToken} />
    </BrowserRouter>
  );
}

export default App;
