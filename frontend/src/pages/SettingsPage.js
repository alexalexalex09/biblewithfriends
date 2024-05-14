import React from "react";
import styles from "../styles/settings.module.css"; // Import your CSS file for styling
import MenuBar from "../components/MenuBar";

// Profile Section
function ProfileSection() {
  const logout = () => {
    window.open("http://localhost:5000/oauth/logout", "_self");
  };
  return (
    <div className={styles.settingsSection}>
      <h2>Profile</h2>
      <ul>
        <li>Change Username</li>
        <li>Change Profile Picture</li>
        <li onClick={logout}>Sign Out</li>
        <li>Delete Account</li>
      </ul>
    </div>
  );
}

// Reading Section
function ReadingSection() {
  return (
    <div className={styles.settingsSection}>
      <h2>Reading</h2>
      <ul>
        <li>Text Size</li>
        <li>Default Version</li>
        <li>Switch to Dark Mode</li>
      </ul>
    </div>
  );
}

// Plans Section
function PlansSection() {
  // Dummy list of plans subscribed by the user
  const userPlans = ["Plan 1", "Plan 2", "Plan 3"];

  return (
    <div className="settings-section">
      <h2>Plans</h2>
      <ul>
        <li>Add New Plans</li>
        {/* Dynamic list of plans */}
        {userPlans.map((plan, index) => (
          <li key={index}>{plan}</li>
        ))}
      </ul>
    </div>
  );
}

// Main Settings Page Component
function SettingsPage() {
  return (
    <div className="settings-page">
      <ProfileSection />
      <ReadingSection />
      <PlansSection />
      <MenuBar linksToShow={{ home: true, newPlan: false, account: false }} />
    </div>
  );
}

export default SettingsPage;
