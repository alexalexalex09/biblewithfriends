import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/carousel.css";
//import { useParams } from "react-router-dom";
//import axios from "axios";

function Carousel({ carouselId }) {
  const [squares, setSquares] = useState([]);
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    if (carouselId) {
      getCarousel();
    }
  }, [carouselId]);

  const getCarousel = async () => {
    try {
      const body = { id: 1 };
      const response = await axios.post("/getCarousel", body);
      setSquares(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const addDay = async () => {
    try {
      const body = { content: newContent };
      const response = await axios.post("/saveCarousel", body);
      setSquares([...squares, response.data]);
      setNewContent("");
    } catch (error) {
      console.error("Failed to add data:", error);
    }
  };

  return (
    <div className="carousel">
      {squares.map((div) => (
        <div key={div.id} className="square">
          {div.content}
        </div>
      ))}
      <div className="square addDay" onClick={addDay}>
        <div className="addIcon">
          <i className="fa-solid fa-circle-plus"></i>
        </div>
        <div className="addTitle">Add New</div>
      </div>
    </div>
  );
}

export default Carousel;
