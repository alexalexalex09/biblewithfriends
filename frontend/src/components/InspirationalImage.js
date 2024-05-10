import React from "react";
import InspireImage from "../images/inspiring/1.png";
import styles from "../styles/inspirationalImage.module.css";

// Inspirational Image Component
function InspirationalImage() {
  return (
    <div className={styles.inspirationalImage}>
      {/* Insert your inspirational image here */}
      <img src={InspireImage} alt="Inspirational" />
    </div>
  );
}

export default InspirationalImage;
