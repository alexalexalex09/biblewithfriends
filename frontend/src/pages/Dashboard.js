import React from "react";
import styles from "../styles/dashboard.module.css"; // Import your CSS file for styling
import InspirationalImage from "../components/InspirationalImage";
import MyPlansCarousel from "../components/MyPlansCarousel";
import BiblePassageInterface from "../components/BiblePassageInterface";
import MenuBar from "../components/MenuBar";

// Main App Component
function HomePage() {
  return (
    <div className={styles.home}>
      <InspirationalImage />
      <div className={styles.myPlans}>
        <h1 className={styles.carouselTitle}>My Plans</h1>
        <MyPlansCarousel />
      </div>

      <div className={styles.homeBiblePassageInterface}>
        <h1 className={styles.biblePassageInterfaceTitle}>Bible</h1>
        <BiblePassageInterface />
      </div>
      <MenuBar
        linksToShow={{ home: false, newPlan: true, account: true, blog: true }}
      />
    </div>
  );
}

export default HomePage;
