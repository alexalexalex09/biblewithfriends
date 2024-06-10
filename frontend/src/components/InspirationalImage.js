import React from "react";
import styles from "../styles/inspirationalImage.module.css";

// Inspirational Image Component
function InspirationalImage() {
  return (
    <div className={styles.inspirationalImage}>
      {/* Insert your inspirational image here */}
      <img
        src={process.env.REACT_APP_PROXY_URL + "/images/inspiring/1.png"}
        alt="Inspirational"
      />
    </div>
  );
}

export default InspirationalImage;
