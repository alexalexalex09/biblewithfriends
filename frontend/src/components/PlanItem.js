import React from "react";
import styles from "../styles/planItem.module.css";

function PlanItem({ image, title, displayTitle = false }) {
  return (
    <div className={styles.planItem}>
      <div className={styles.planImage}>
        <img src={"/images/plans/" + image} alt={title}></img>
      </div>
      {displayTitle && <div className={styles.planTitle}>{title}</div>}
    </div>
  );
}

export default PlanItem;
