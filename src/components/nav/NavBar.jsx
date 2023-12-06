/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar p-0" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container-fluid">
        <a className="navbar-brand">Tastevine</a>
        <div className="flex max-h-full">
          {token ? <div>Navbar for logged in user</div> : ""}
        </div>
        <div>
          {token ? (
            <div className="hover:bg-cyan-600/90 py-2.5 px-3">
              <button
                className=""
                onClick={() => {
                  setToken("");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex">
              <div className="mr-2 py-2.5 px-3 hover:bg-cyan-600/90">
                <Link to="/register">Register</Link>
              </div>
              <div className="mr-2 py-2.5 px-3 hover:bg-cyan-600/90">
                <Link to="/login">Login</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
