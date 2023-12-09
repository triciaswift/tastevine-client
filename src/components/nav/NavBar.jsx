import { Link, useNavigate } from "react-router-dom";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg p-0 bg-cyan-600/80 text-white">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white">
          Tastevine
        </Link>
        {token ? (
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 items-center ">
              <li className="nav-item mx-4 px-4 py-0.5 hover:bg-cyan-600/90">
                <Link
                  to="recipes/all"
                  className="nav-link text-white"
                  aria-current="page"
                >
                  All Recipes
                </Link>
              </li>
              <li className="nav-item px-4 py-0.5 hover:bg-cyan-600/90">
                <Link to="/recipes/mine" className="nav-link text-white">
                  My Recipes
                </Link>
              </li>
              <li className="nav-item dropdown mx-4 px-4 py-2.5 hover:bg-cyan-600/90">
                <button
                  className="dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Add
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/recipes/new"
                      className="dropdown-item hover:bg-slate-400/30 active:bg-slate-500/50"
                    >
                      Recipe
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/ingredients/new"
                      className="dropdown-item hover:bg-slate-400/30 active:bg-slate-500/50"
                    >
                      Ingredient
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
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
