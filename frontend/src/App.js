import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import Dashboard from "./pages/Dashboard";
import BiblePage from "./pages/BiblePage";
import CreatePlanPage from "./pages/CreatePlanPage";
import BrowsePlansPage from "./pages/BrowsePlansPage";
import UserContext from "./components/UserContext";
import PrivateRoutes from "./components/PrivateRoutes";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/bible/:book/:chapter" element={<BiblePage />} />
            <Route path="/create" element={<CreatePlanPage />} />
            <Route path="/plans" element={<BrowsePlansPage />} />
          </Route>
          <Route path="/" element={<Welcome />} exact />
          <Route path="*" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
