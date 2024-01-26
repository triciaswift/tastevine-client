import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = ({ token, setToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-green-800 sm:flex sm:justify-between sm:items-center sm:px-2 sm:py-2">
      <div className="nav-bar flex items-center justify-between">
        <div>
          <Link to="/" className="text-xl text-white">
            Tastevine
          </Link>
        </div>
        <div className="sm:hidden">
          <button
            type="button"
            className="block text-white"
            onClick={toggleMenu}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                // X symbol
                <path
                  fillRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                // Hamburger symbol
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {token ? (
        <div className={`nav-links ${isOpen ? "block" : "hidden"} sm:flex`}>
          <Link className="nav-link mt-0" to="recipes/all">
            All Recipes
          </Link>
          <Link className="nav-link" to="/recipes/mine">
            My Recipes
          </Link>
          <Link className="nav-link" to="/favorites">
            Favorites
          </Link>
          <Link className="nav-link" to="/recipes/new">
            Add Recipe
          </Link>
          <Link className="nav-link" to="/groceries">
            Grocery List
          </Link>
          <button
            className="nav-link font-montserrat"
            onClick={() => {
              setToken("");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="px-2 pb-4">
          <div className="mr-2 py-2.5 px-3 hover:bg-green-800/90">
            <Link to="/register">Register</Link>
          </div>
          <div className="mr-2 py-2.5 px-3 hover:bg-green-800/90">
            <Link to="/login">Login</Link>
          </div>
        </div>
      )}
    </header>
    // <header className="p-0 bg-green-800/80 text-white">
    //   <div className="flex items-center justify-between">
    //     <Link to="/" className="text-xl text-white">
    //       Tastevine
    //     </Link>
    //     {token ? (
    //       <>
    //         <button>
    //           <span className=""></span>
    //         </button>
    //         <div className="">
    //           <ul className="flex me-auto mb-2 mb-lg-0 items-center ">
    //             <li
    //               className="px-4 py-0.5 hover:bg-green-800/90"
    //               aria-current="page"
    //             >
    //               <Link to="recipes/all" className="text-white">
    //                 All Recipes
    //               </Link>
    //             </li>
    //             <li className="px-4 py-0.5 hover:bg-green-800/90">
    //               <Link to="/recipes/mine" className="text-white">
    //                 My Recipes
    //               </Link>
    //             </li>
    //             <li className="px-4 py-0.5 hover:bg-green-800/90">
    //               <Link to="/favorites" className="text-white">
    //                 Favorites
    //               </Link>
    //             </li>
    //             <li className="px-4 py-0.5 hover:bg-green-800/90">
    //               <Link to="/recipes/new" className="text-white">
    //                 Add Recipe
    //               </Link>
    //             </li>
    //             <li className="px-4 py-0.5 hover:bg-green-800/90">
    //               <Link to="/groceries" className="text-white">
    //                 Grocery List
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>
    //       </>
    //     ) : (
    //       ""
    //     )}
    //     <div>
    //       {token ? (
    //         <div className="flex items-center">
    //           <div className="hover:bg-green-800/90 py-2.5 px-3 mx-2">
    //             <button
    //               className=""
    //               onClick={() => {
    //                 setToken("");
    //                 navigate("/login");
    //               }}
    //             >
    //               Logout
    //             </button>
    //           </div>
    //           <div
    //             className="mx-2 p-2.5"
    //             onClick={() => {
    //               navigate(`/account`);
    //             }}
    //           >
    //             <button>
    //               <i className="fa-solid fa-circle-user fa-2xl"></i>
    //             </button>
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="flex">
    //           <div className="mr-2 py-2.5 px-3 hover:bg-green-800/90">
    //             <Link to="/register">Register</Link>
    //           </div>
    //           <div className="mr-2 py-2.5 px-3 hover:bg-green-800/90">
    //             <Link to="/login">Login</Link>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </header>
  );
};
