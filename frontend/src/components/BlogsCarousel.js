import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/carousel.module.css";
//import { useParams } from "react-router-dom";
//import axios from "axios";

function BlogsCarousel() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_PROXY_URL + "/getBlogs"
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <div className={styles.blogCarousel}>
      {blogs.map((div) => (
        <div key={div.id} className={styles.blogImage}>
          {div.title}
        </div>
      ))}
    </div>
  );
}

export default BlogsCarousel;
