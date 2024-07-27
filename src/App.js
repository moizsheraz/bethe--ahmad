import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import About from "./pages/About";
import Register from "./pages/Register";
import Navbarlist from "./tools/Navbarlist";
import Balloons from "./background/ballons";
import HomePage from "./pages/HomePage";
import SurveyForm from "./pages/AIForom";
import Products from "./Products";
import "./App.css";
import InvetationPage from "./pages/InvetationPages/InvetationPage";
import InvetationForom from "./pages/InvetationPages/InvetationForom";
import GiftsPage from "./pages/accountPages/GiftsPage";
import QuestionsPage from "./pages/QuestionsPage";
import Calendar from "./pages/accountPages/Calendar";
import { ChildProvider } from "./pages/context/ChildContext";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const userInfo = localStorage.getItem("user-info");
    return userInfo ? JSON.parse(userInfo) : null;
  });
  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("user-info", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user-info");
  };

  return (
    <div className="App">
      <ChildProvider>
        {/* <Balloons /> */}
        <Navbarlist currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<Login users={users} onLogin={handleLogin} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/ai-help" element={<SurveyForm />} />
          <Route path="/products" element={<Products />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/gifts-Page" element={<GiftsPage />} />
          <Route path="/questions-page" element={<QuestionsPage />} />
          <Route
            path="/register"
            element={<Register users={users} setUsers={setUsers} />}
          />
          <Route
            path="/invitation/:invitationId"
            element={<InvetationPage />}
          />
          <Route path="/invitation-form" element={<InvetationForom />} />
        </Routes>
      </ChildProvider>
    </div>
  );
}

export default App;
