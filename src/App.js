import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistationPage";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
