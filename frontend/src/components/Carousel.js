import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/carousel.module.css";
import BlogItem from "./BlogItem";
import PlanItem from "./PlanItem";
//import { useParams } from "react-router-dom";
//import axios from "axios";

function Carousel({ carouselId, displayTitle }) {
  const [items, setItems] = useState([]);
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    if (carouselId) {
      getCarousel();
    }
  }, [carouselId]);

  const getCarousel = async () => {
    try {
      const body = { id: carouselId };
      const response = await axios.post("/getCarousel", body);
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const addNew = async () => {
    try {
      const body = { content: newContent };
      const response = await axios.post("/saveCarousel", body);
      setItems([...items, response.data]);
      setNewContent("");
    } catch (error) {
      console.error("Failed to add data:", error);
    }
  };

  let additionalClasses = "";
  switch (carouselId) {
    case "blogs":
      additionalClasses += styles.blogCarousel;
      break;
    default:
      additionalClasses += styles.planCarousel;
  }

  return (
    <div className={styles.carousel + " " + additionalClasses}>
      {items.map((div) => (
        <>
          {carouselId === "blogs" && (
            <BlogItem
              key={div.id}
              title={div.title}
              image={div.image}
            ></BlogItem>
          )}
          {carouselId !== "blogs" && (
            <PlanItem
              key={div.id}
              title={div.title}
              image={div.image}
              displayTitle={displayTitle}
            ></PlanItem>
          )}
        </>
      ))}
      {carouselId !== "allPlans" && carouselId !== "blogs" && (
        <div className={`${styles.item} ${styles.addNew}`} onClick={addNew}>
          <div className={styles.addIcon}>
            <i className="fa-solid fa-circle-plus"></i>
          </div>
          <div className={styles.addTitle}>Add New</div>
        </div>
      )}
    </div>
  );
}

export default Carousel;
