import React from "react";
import styles from "../styles/testimonial.module.css";

function Testimonial({ image, quote, author }) {
  return (
    <div className={styles.testimonial} style={{ backgroundUrl: image }}>
      <div className={styles.testimonialQuote}>{quote}</div>
      <div className={styles.testimonialAuthor}>{author}</div>
    </div>
  );
}

export default Testimonial;
