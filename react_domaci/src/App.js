import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./components/LoginPage/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
