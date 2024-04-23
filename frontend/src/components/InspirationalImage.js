import React from "react";
import InspireImage from "../images/inspiring/1.png";

// Inspirational Image Component
function InspirationalImage() {
  return (
    <div className="inspirational-image">
      {/* Insert your inspirational image here */}
      <img src={InspireImage} alt="Inspirational" />
    </div>
  );
}

export default InspirationalImage;
