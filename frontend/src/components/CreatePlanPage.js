import React, { useState, useEffect } from "react";
import ImageCropper from "./ImageCropper";
import MenuBar from "./MenuBar";
import Carousel from "./Carousel";
import "../styles/createPlanPage.css";
import "../styles/ReactCrop.css";

// Main App Component
function CreatePlanPage() {
  const [title, setTitle] = useState(null);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
  };

  const handleUploadClick = () => {
    document.querySelector(".imageCropperDisplay").classList.remove("hidden");
    // Trigger file input click
  };

  return (
    <div className="createPage">
      <div className="title">
        <h2>Create a Plan</h2>
      </div>
      <div className="createForm">
        <div className="planIcon" onClick={handleUploadClick}></div>
        <div className="planTitle">
          <input type="text" onChange={handleTitleChange}></input>
        </div>
        <Carousel options={{ type: "create" }} />
      </div>
      <MenuBar linksToShow={{ home: true, newPlan: true, account: true }} />
      <div className="imageCropperDisplay hidden">
        <ImageCropper></ImageCropper>
      </div>
    </div>
  );
}

export default CreatePlanPage;
