import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../managers/AuthManager";

export const Login = ({ setToken, setId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    loginUser(user).then((authInfo) => {
      if (authInfo && authInfo.token) {
        setToken(authInfo.token);
        setId(authInfo.userId);
        navigate("/");
      } else {
        setIsUnsuccessful(true);
      }
    });
  };

  return (
    <main>
      <section className="flex flex-col justify-center items-center">
        <h1 className="mb-10">Welcome to Tastevine</h1>
        <div className="w-[35rem] px-8 py-4 rounded-lg mb-4">
          <form onSubmit={handleLogin}>
            <p className="mb-4 text-2xl">Login To Your Account</p>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <div>
                <input
                  className="form-control focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="basis-1/2 mb-2">
              <label className="form-label">Password</label>
              <div>
                <input
                  className="form-control focus:ring-4 focus:ring-green-700/40 focus:border focus:border-green-700"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {isUnsuccessful ? (
              <p className="text-red-500 mx-auto w-max">
                Username or password not valid
              </p>
            ) : (
              ""
            )}

            <div className="mt-6">
              <button className="btn btn-success rounded-full w-100">
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
      <div className="loginLinks mb-6">
        <div className="link--register text-center">
          <Link
            className="underline text-blue-600 hover:text-blue-600 visited:text-black"
            to="/register"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
};
