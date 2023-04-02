import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistationPage";
import LoginPage from "./pages/LoginPage";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<RegistrationPage />} />
      <Route path="/signin" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
