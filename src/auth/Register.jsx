/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { registerUser } from "../managers/AuthManager";
import { useNavigate } from "react-router-dom";

export const Register = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [matchUnsuccessful, setMatchUnsuccessful] = useState(false);
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password === verifyPassword) {
      const newUser = {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      };

      registerUser(newUser).then((authInfo) => {
        if (authInfo && authInfo.token) {
          setToken(authInfo.token);
          navigate("/");
        } else {
          existDialog.current.showModal();
        }
      });
    } else {
      setMatchUnsuccessful(true);
    }
  };

  return (
    <main>
      <dialog className="dialog dialog--auth p-2" ref={existDialog}>
        <div className="text-center my-3">Email already exists.</div>
        <div className="flex justify-end pr-3">
          <button
            className="button--close"
            onClick={(e) => existDialog.current.close()}
          >
            Close
          </button>
        </div>
      </dialog>

      <section className="flex justify-center mt-20">
        <form className="w-5/12" onSubmit={handleRegister}>
          <h1 className="text-center text-4xl mb-16">Welcome to Tastevine</h1>
          <p className="mb-4 text-2xl">Create an Account</p>
          <div className="flex">
            <div className="mb-2 mr-2 basis-1/2">
              <label className="form-label">First Name</label>
              <div>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>
            <div className="mb-2 basis-1/2">
              <label className="form-label">Last Name</label>
              <div>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <div>
              <input
                className="form-control"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>
          <div className="flex">
            <div className="basis-1/2 mb-2 mr-2">
              <label className="form-label">Password</label>
              <div>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>
            <div className="basis-1/2 mb-8">
              <label className="form-label">Verify Password</label>
              <div>
                <input
                  className="form-control"
                  type="password"
                  name="verifyPassword"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              {matchUnsuccessful ? (
                <p className="text-red-500">Password does not match</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto mb-10">
            <button className="btn btn-primary rounded-full">
              Get Started
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};
