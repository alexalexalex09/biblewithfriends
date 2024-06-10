import React from "react";
import styles from "../styles/planItem.module.css";

function PlanItem({ image, title, displayTitle = false }) {
  return (
    <div className={styles.planItem}>
      <div className={styles.planImage}>
        <img
          src={process.env.REACT_APP_PROXY_URL + "/images/plans/" + image}
          alt={title}
        ></img>
      </div>
      {displayTitle && <div className={styles.planTitle}>{title}</div>}
    </div>
  );
}

export default PlanItem;
