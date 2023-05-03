import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistationPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import BrandsPage from "./pages/BrandsPage";
import ModelsPage from "./pages/ModelsPage";
import React from "react";
import AppContex from "./context";
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

function App() {
  const [user, setUser] = React.useState(() => {
    return {
      email: "",
      name: "",
      role: "",
      phone: "",
    };
  });

  return (
    <AppContex.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/models" element={<ModelsPage />} />
        <Route path="/carInfo/:id" element={<CarInfoPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/addingNewCar" element={<AddingNewCarPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/statistic" element={<StatisticsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
      </Routes>
    </AppContex.Provider>

  );
}

export default App;
