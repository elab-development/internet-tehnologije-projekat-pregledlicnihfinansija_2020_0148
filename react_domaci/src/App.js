import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/LoginPage/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import HomePage from "./components/HomePage/HomePage";
import LogoutPage from "./components/Logout/Logout";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Users from "./components/Users/Users";
import Transactions from "./components/Transactions/Transactions";
import Contact from "./components/Contact/Contact";
import React from "react";
import { useState } from "react";
import { UserProvider } from "./UserContext";
import CryptoPrices from "./components/CryptoPrices/CryptoPrices";
import Preferences from "./components/Preferences/Preferences";
import FinanceQuiz from "./components/Quiz/FinanceQuiz";
import Categories from "./components/Category/Categories";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";

function App() {
  const [token, setToken] = useState();
  function addToken(auth_token) {
    setToken(auth_token);
  }
  return (
    <UserProvider>
      <BrowserRouter className="App">
        <NavBar token={token} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage addToken={addToken} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/users" element={<Users />} />
          <Route path="/crypto" element={<CryptoPrices />} />
          <Route path="/converter" element={<CurrencyConverter />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/quiz" element={<FinanceQuiz />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
