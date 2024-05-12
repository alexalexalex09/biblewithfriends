import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SettingsPage from "./components/SettingsPage";
import Dashboard from "./components/Dashboard";
import BiblePage from "./components/BiblePage";
import CreatePlanPage from "./components/CreatePlanPage";
import UserContext from "./components/UserContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("/oauth/login", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
          console.log("User: " + resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Dashboard />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/bible/:book/:chapter" element={<BiblePage />} />
          <Route path="/create" element={<CreatePlanPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
