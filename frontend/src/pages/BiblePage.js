import React from "react";
import styles from "../styles/settings.module.css"; // Import your CSS file for styling
import BibleDisplay from "../components/BibleDisplay";
import MenuBar from "../components/MenuBar";

function BiblePage() {
  return (
    <div className={styles.biblePage}>
      <BibleDisplay />
      <MenuBar linksToShow={{ home: true, newPlan: false, account: false }} />
    </div>
  );
}

export default BiblePage;
