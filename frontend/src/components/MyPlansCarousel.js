import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/myPlansCarousel.module.css";

// My Plans Carousel Component
function MyPlansCarousel() {
  const navigate = useNavigate();

  const handleNewPlan = () => {
    navigate("/create");
  };
  return (
    <div className={styles.carousel}>
      <div
        className={`${styles.carouselSquare} ${styles.newPlanSquare}`}
        onClick={handleNewPlan}
      >
        <span>New Plan</span>
        <i className="fa-solid fa-book-medical"></i>
      </div>
    </div>
  );
}

export default MyPlansCarousel;
