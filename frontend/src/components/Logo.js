import React from "react";
import styles from "../styles/logo.module.css";

function Logo({ size, position }) {
  return (
    <div className={`${styles.logo} ${styles["logo" + position]}`}>
      <img width={size} height={size} src={"/images/logo.svg"} alt="logo"></img>
    </div>
  );
}

export default Logo;
