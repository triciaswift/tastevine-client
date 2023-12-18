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
              <li className="nav-item px-4 py-0.5 hover:bg-cyan-600/90">
                <Link to="/recipes/new" className="nav-link text-white">
                  Add Recipe
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
        <div>
          {token ? (
            <div className="flex items-center">
              <div className="hover:bg-cyan-600/90 py-2.5 px-3 mx-2">
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
              <div
                className="mx-2 p-2.5"
                onClick={() => {
                  navigate(`/account`);
                }}
              >
                <button>
                  <i className="fa-solid fa-circle-user fa-2xl"></i>
                </button>
              </div>
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
