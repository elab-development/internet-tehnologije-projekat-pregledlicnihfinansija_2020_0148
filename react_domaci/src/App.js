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
import Utilities from "./components/Transactions/Categories/Utilities";
import Groceries from "./components/Transactions/Categories/Groceries";
import Transportation from "./components/Transactions/Categories/Transportation";
import Entertainment from "./components/Transactions/Categories/Entertainment";
import Shopping from "./components/Transactions/Categories/Shopping";
import HealthAndWellness from "./components/Transactions/Categories/HealthAndWellness";

function App() {
  return (
    <BrowserRouter className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/users" element={<Users />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/utilities" element={<Utilities />} />
        <Route path="/transactions/groceries" element={<Groceries />} />
        <Route path="/transactions/entertainment" element={<Entertainment />} />
        <Route path="/transactions/shopping" element={<Shopping />} />
        <Route
          path="/transactions/healthandwellness"
          element={<HealthAndWellness />}
        />
        <Route
          path="/transactions/transportation"
          element={<Transportation />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
