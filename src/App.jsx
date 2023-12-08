import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [token, setTokenState] = useState(localStorage.getItem("auth_token"));
  const [currentUserId, setCurrentUserId] = useState(
    JSON.parse(localStorage.getItem("userId"))
  );

  const setToken = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    setTokenState(newToken);
  };

  const setUserId = (newId) => {
    localStorage.setItem("userId", newId);
    setCurrentUserId(newId);
  };

  return (
    <BrowserRouter>
      <NavBar token={token} setToken={setToken} />
      <ApplicationViews
        token={token}
        setToken={setToken}
        userId={currentUserId}
        setId={setUserId}
      />
    </BrowserRouter>
  );
}

export default App;
