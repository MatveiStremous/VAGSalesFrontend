import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistationPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import React from "react";
import AppContex from "./context";
import authService from "./services/AuthService";

function App() {
  const [user, setUser] = React.useState(() => {
    return {
      email: "",
      name: "",
      role: "",
      phone: "",
    };
  });

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      authService.validToken();
      setUser(authService.getUserInfo());
    }
  }, []);

  return (
    <AppContex.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </AppContex.Provider>

  );
}

export default App;
