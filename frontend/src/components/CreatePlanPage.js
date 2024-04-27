import React, { useState, useRef } from "react";
import CropModal from "./CropModal";
import MenuBar from "./MenuBar";
import Carousel from "./Carousel";
import "../styles/createPlanPage.css";
import "../styles/ReactCrop.css";

// Main App Component
function CreatePlanPage() {
  const [title, setTitle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const iconUrl = useRef(`${process.env.PUBLIC_URL}/images/inspiring/1.png`);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
  };

  const handleUploadClick = () => {
    setModalOpen(true);
    // Trigger file input click
  };

  const updateIcon = (imgSrc) => {
    iconUrl.current = imgSrc;
  };
  console.log(typeof updateIcon);

  return (
    <div className="createPage">
      <div className="title">
        <h2>Create a Plan</h2>
      </div>
      <div className="createForm">
        <div
          className="planIcon"
          onClick={handleUploadClick}
          style={{ backgroundImage: "url(" + iconUrl.current + ")" }}
        ></div>
        <div className="planTitle">
          <input type="text" onChange={handleTitleChange}></input>
        </div>
        <Carousel options={{ type: "create" }} />
      </div>
      <MenuBar linksToShow={{ home: true, newPlan: true, account: true }} />
      <div className="imageCropperDisplay">
        {modalOpen && (
          <CropModal
            updateIcon={updateIcon}
            closeModal={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default CreatePlanPage;
