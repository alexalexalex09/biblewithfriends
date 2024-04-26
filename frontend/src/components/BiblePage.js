import React from "react";
import "../styles/settings.css"; // Import your CSS file for styling
import BibleDisplay from "./BibleDisplay";
import MenuBar from "./MenuBar";

function BiblePage() {
  return (
    <div className="bible-page">
      <BibleDisplay />
      <MenuBar linksToShow={{ home: true, newPlan: false, account: false }} />
    </div>
  );
}

export default BiblePage;
