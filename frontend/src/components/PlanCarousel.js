import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "../styles/carousel.module.css";
import PlanItem from "./PlanItem";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

function PlanCarousel({ carouselId, displayTitle }) {
  const [items, setItems] = useState([]);
  const [planId, setPlanId] = useState([]);
  const navigate = useNavigate();
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
      console.log(carouselId + ": " + response.data.length);
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const addNew = async () => {
    if (carouselId === user.id) {
      navigate("/create");
    } else {
      try {
        const body = { user: user.id, plan: planId };
        const response = await axios.post("/saveCarousel", body);
        setItems([...items, response.data]);
      } catch (error) {
        console.error("Failed to add data:", error);
      }
    }
  };

  let titleClass = "";
  if (displayTitle) {
    titleClass = styles.carouselWithTitle;
  }

  return (
    <div
      className={styles.carousel + " " + styles.planCarousel + " " + titleClass}
    >
      <div className={styles.spacer}></div>
      {items.length > 0
        ? items.map((div) => (
            <React.Fragment key={div._id}>
              <PlanItem
                title={div.title}
                image={div.image}
                displayTitle={displayTitle}
              ></PlanItem>
            </React.Fragment>
          ))
        : ""}
      <div className={styles.addNewContainer}>
        <div className={`${styles.item} ${styles.addNew}`} onClick={addNew}>
          <div className={styles.addIcon}>
            <i className="fa-solid fa-circle-plus"></i>
          </div>
          <div className={styles.addTitle}>Add New</div>
        </div>
      </div>
    </div>
  );
}

export default PlanCarousel;
