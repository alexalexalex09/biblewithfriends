import React from "react";
import { Link } from "react-router-dom";

// My Plans Carousel Component
function MyPlansCarousel() {
  return (
    <div className="my-plans">
      <h2 className="carousel-title">My Plans</h2>
      {/* Insert your carousel component here */}
      <div className="carousel">
        {/* Carousel squares with icons */}
        <div className="carousel-square new-plan-square">
          <span>New Plan</span>
          <img src="new-plan-icon.png" alt="Plan Icon" />
        </div>
        {/* Example:
          <div className="carousel-square">
            <img src="plan-icon.png" alt="Plan Icon" />
          </div> */}
      </div>
    </div>
  );
}

export default MyPlansCarousel;
