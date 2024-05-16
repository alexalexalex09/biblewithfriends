import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "../styles/carousel.module.css";
import BlogItem from "./BlogItem";
import PlanItem from "./PlanItem";
import { UserContext } from "./UserContext";

function DisplayCarousel({ carouselId, displayTitle }) {
  const [items, setItems] = useState([]);
  const [planId, setPlanId] = useState([]);
  const theContext = useContext(UserContext);
  let user = null;
  if (theContext != null) {
    user = theContext.user;
  }

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
      const body = { user: user.id, plan: planId };
      const response = await axios.post("/saveCarousel", body);
      setItems([...items, response.data]);
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
      {items.length > 0
        ? items.map((div) => (
            <React.Fragment key={div._id}>
              {carouselId === "blogs" && (
                <BlogItem title={div.title} image={div.image}></BlogItem>
              )}
              {carouselId !== "blogs" && (
                <PlanItem
                  title={div.title}
                  image={div.image}
                  displayTitle={displayTitle}
                ></PlanItem>
              )}
            </React.Fragment>
          ))
        : ""}
    </div>
  );
}

export default DisplayCarousel;
