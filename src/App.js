import { Route, Routes } from "react-router-dom";
import AuthService from "./services/AuthService";
import React from "react";
import AppContex from "./context";

import RegistrationPage from "./pages/RegistationPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import BrandsPage from "./pages/BrandsPage";
import ModelsPage from "./pages/ModelsPage";
import CarInfoPage from "./pages/CarInfoPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import AddingNewCarPage from "./pages/AddingNewCarPage";
import SupportPage from "./pages/SupportPage";
import StatisticsPage from "./pages/StatisticPage";
import AccountPage from "./pages/AccountPage";
import UsersPage from "./pages/UsersPage";
import RequestsPage from "./pages/RequestsPage";
import QuestionsPage from "./pages/QuestionsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ManagerPage from "./pages/ManagerPage";

function App() {
  const [user, setUser] = React.useState(() => {
    return {
      email: "",
      name: "",
      role: "",
      phone: "",
    };
  });

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      AuthService.validToken().catch(function (error) {
        localStorage.removeItem("token");
        window.location.reload("/login");
      });
      AuthService.getUserInfo()
        .then(({ data }) => {
          setUser(data);
        });
    }
    setIsLoading(false);

  }, [setUser]);

  if (isLoading) {
    return <h1> </h1>
  }

  return (
    <AppContex.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/carInfo/:id" element={<CarInfoPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/account" element={<AccountPage />} />

        {(user.role === "ROLE_MANAGER" || user.role === "ROLE_ADMIN") && <Route path="/brands" element={<BrandsPage />} />}
        {(user.role === "ROLE_MANAGER" || user.role === "ROLE_ADMIN") && <Route path="/models" element={<ModelsPage />} />}
        {(user.role === "ROLE_MANAGER" || user.role === "ROLE_ADMIN") && <Route path="/addingNewCar" element={<AddingNewCarPage />} />}
        {(user.role === "ROLE_MANAGER" || user.role === "ROLE_ADMIN") && <Route path="/statistic" element={<StatisticsPage />} />}
        {(user.role === "ROLE_MANAGER" || user.role === "ROLE_ADMIN") && <Route path="/requests" element={<RequestsPage />} />}
        {(user.role === "ROLE_MANAGER" || user.role === "ROLE_ADMIN") && <Route path="/questions" element={<QuestionsPage />} />}
        {(user.role === "ROLE_MANAGER" || user.role === "ROLE_ADMIN") && <Route path="/manager" element={<ManagerPage />} />}

        {user.role === "ROLE_ADMIN" && <Route path="/users" element={<UsersPage />} />}

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </AppContex.Provider >

  );
}

export default App;
