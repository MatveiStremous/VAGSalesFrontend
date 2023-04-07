import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistationPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<RegistrationPage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
