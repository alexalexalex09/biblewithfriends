import React from "react";
import "../styles/myPlansCarousel.css";

// My Plans Carousel Component
function MyPlansCarousel() {
  return (
    <div className="carousel">
      {/* Carousel squares with icons */}
      <div className="carousel-square new-plan-square">
        <span>New Plan</span>
        <i className="fa-solid fa-book-medical"></i>
      </div>
      {/* Example:
          <div className="carousel-square">
            <img src="plan-icon.png" alt="Plan Icon" />
          </div> */}
    </div>
  );
}

export default MyPlansCarousel;
