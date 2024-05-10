import React from "react";
import styles from "../styles/home.module.css"; // Import your CSS file for styling
import InspirationalImage from "./InspirationalImage";
import MyPlansCarousel from "./MyPlansCarousel";
import BiblePassageInterface from "./BiblePassageInterface";
import MenuBar from "./MenuBar";

// Main App Component
function HomePage() {
  return (
    <div className={styles.home}>
      <InspirationalImage />
      <div className={styles.myPlans}>
        <h2 className={styles.carouselTitle}>My Plans</h2>
        <MyPlansCarousel />
      </div>

      <div className={styles.homeBiblePassageInterface}>
        <h2 className={styles.biblePassageInterfaceTitle}>Bible</h2>
        <BiblePassageInterface />
      </div>
      <MenuBar linksToShow={{ home: false, newPlan: true, account: true }} />
    </div>
  );
}

export default HomePage;
