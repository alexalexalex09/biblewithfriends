import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SettingsPage from "./components/SettingsPage";
import HomePage from "./components/HomePage";
import BiblePage from "./components/BiblePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="bible/:book/:chapter/:verse" element={<BiblePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
