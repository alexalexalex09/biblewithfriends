import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SettingsPage from "./components/SettingsPage";
import HomePage from "./components/HomePage";
import Welcome from "./components/Welcome";
import BiblePage from "./components/BiblePage";
import CreatePlanPage from "./components/CreatePlanPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Welcome />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="bible/:book/:chapter" element={<BiblePage />} />
          <Route path="create" element={<CreatePlanPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
