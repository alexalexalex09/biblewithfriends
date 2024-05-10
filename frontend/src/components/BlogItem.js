import React from "react";
import styles from "../styles/blogItem.module.css";

function BlogItem({ image, title }) {
  return (
    <div className={styles.blogItem}>
      <div className={styles.blogImage}>
        <img src={"/images/blogs/" + image} alt={title}></img>
      </div>
      <div className={styles.blogTitle}>{title}</div>
    </div>
  );
}

export default BlogItem;
