import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import Dashboard from "./pages/Dashboard";
import BiblePage from "./pages/BiblePage";
import CreatePlanPage from "./pages/CreatePlanPage";
import UserContext from "./components/UserContext";

function App() {
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
