import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./components/LoginPage/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import HomePage from "./components/HomePage/HomePage";
import LogoutPage from "./components/Logout/Logout";

function App() {
  return (
    <BrowserRouter className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
