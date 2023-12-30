/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { registerUser } from "../managers/AuthManager";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../utils/FormInput";

export const Register = ({ setToken, setId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [matchUnsuccessful, setMatchUnsuccessful] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
          setId(authInfo.userId);
          navigate("/");
        } else {
          openModal();
        }
      });
    } else {
      setMatchUnsuccessful(true);
    }
  };

  return (
    <section className="flex flex-col items-center mt-20">
      <h1 className="mb-16">Welcome to Tastevine</h1>
      <div className="w-5/12 bg-cyan-600 p-4 rounded-lg">
        <form className="" onSubmit={handleRegister}>
          <p className="mb-4 text-2xl text-white">Create an Account</p>
          <div className="flex">
            <div className="mb-2 mr-2 basis-1/2">
              <label className="form-label text-white">First Name</label>
              <div>
                <FormInput
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-2 basis-1/2">
              <label className="form-label text-white">Last Name</label>
              <div>
                <FormInput
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <label className="form-label text-white">Email</label>
            <div>
              <FormInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex">
            <div className="basis-1/2 mb-2 mr-2">
              <label className="form-label text-white">Password</label>
              <div>
                <FormInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="basis-1/2 mb-8">
              <label className="form-label text-white">Verify Password</label>
              <div>
                <FormInput
                  type="password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                />
              </div>
              {matchUnsuccessful ? (
                <p className="text-red-500">Password does not match</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-primary rounded-full">
              Get Started
            </button>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-red-600 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white m-4 rounded-lg">
                  <div className="flex justify-center px-4 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="text-center">
                        <div className="mb-3">
                          <i className="fa-solid fa-triangle-exclamation fa-2xl text-red-600"></i>
                        </div>
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Account exists
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Please create a different account with a different
                            email.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

{
  /* <div
    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity hidden"
    ref={overlayRef}
  ></div>
  <dialog
    className="dialog dialog--auth p-4 border-4 border-red-400 border-double rounded-lg bg-red-700 shadow-2xl"
    ref={existDialog}
  >
    <div className="bg-white rounded-md px-4 pt-4 py-2">
      <div className="text-center">
        An account with that email already exists.
      </div>
      <div className="flex justify-end mt-2">
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </div>
    </div>
  </dialog> */
}
