import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import CropModal from "../components/CropModal";
import MenuBar from "../components/MenuBar";
import PlanCarousel from "../components/PlanCarousel";
import { UserContext } from "../components/UserContext";
import styles from "../styles/createPlanPage.module.css";
import "../styles/ReactCrop.css";

// Main App Component
function CreatePlanPage() {
  //eslint-disable-next-line
  const [title, setTitle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const iconUrl = useRef(`/images/upload-image.png`);
  const { user } = useContext(UserContext);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
  };

  const handleUploadClick = () => {
    setModalOpen(true);
  };

  const updateIcon = (imgSrc) => {
    iconUrl.current = imgSrc;
  };

  const savePlan = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_PROXY_URL + "/upload",
        {
          imageDataUrl: iconUrl.current,
        }
      );
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  return (
    <div className={styles.createPage}>
      <div className={styles.title}>
        <h1>Create a Plan</h1>
      </div>
      <div className={styles.createForm}>
        <div
          className={`${styles.planIcon} ${styles.square}`}
          onClick={handleUploadClick}
          style={{ backgroundImage: "url(" + iconUrl.current + ")" }}
        ></div>

        <div className={styles.planTitle}>
          <label className={styles.planTitleLabel}>Title</label>
          <input type="text" onChange={handleTitleChange}></input>
        </div>
        <div className={styles.createPlanCarousel}>
          <PlanCarousel />
        </div>
      </div>
      <MenuBar linksToShow={{ home: true, newPlan: true, account: true }} />
      <div className={styles.imageCropperDisplay}>
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
