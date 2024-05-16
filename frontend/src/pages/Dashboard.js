import React, { useContext } from "react";
import styles from "../styles/dashboard.module.css"; // Import your CSS file for styling
import InspirationalImage from "../components/InspirationalImage";
import PlanCarousel from "../components/PlanCarousel";
import BiblePassageInterface from "../components/BiblePassageInterface";
import MenuBar from "../components/MenuBar";
import { UserContext } from "../components/UserContext";

// Main App Component
function HomePage() {
  const theContext = useContext(UserContext);
  let user = null;
  if (theContext != null) {
    user = theContext.user;
  }
  return (
    <div className={styles.home}>
      <InspirationalImage />
      <div className={styles.myPlans}>
        <h1 className={styles.carouselTitle}>My Plans</h1>
        <PlanCarousel carouselId={user.id} />
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
