/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import { Register } from "../auth/Register";
import { Login } from "../auth/Login";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
    </Routes>
  );
};
