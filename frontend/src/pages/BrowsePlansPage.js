import React from "react";
import MenuBar from "../components/MenuBar";
import DisplayCarousel from "../components/DisplayCarousel";
import styles from "../styles/browsePlansPage.module.css";

// Main App Component
function CreatePlanPage() {
  return (
    <div className={styles.createPage}>
      <div className={styles.title}>
        <h1>Find Plans</h1>
      </div>
      <div className={styles.addButton}>
        <i className="fa-solid fa-book-medical"></i>
      </div>
      <DisplayCarousel
        carouselId="allPlans"
        disableAddNew="true"
        displayTitle="true"
        key="allPlans"
      />
      <MenuBar
        linksToShow={{ home: true, newPlan: true, account: true }}
      ></MenuBar>
    </div>
  );
}

export default CreatePlanPage;
