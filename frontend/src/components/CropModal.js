import React, { useState, useRef } from "react";
import ReactCrop, {
  convertToPixelCrop,
  makeAspectCrop,
  centerCrop,
} from "react-image-crop";
import "../styles/ReactCrop.css";
import styles from "../styles/cropModal.module.css";

// Main App Component
function CropModal({ updateIcon, closeModal }) {
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  //eslint-disable-next-line
  const [icon, setIcon] = useState(null);
  const [crop, setCrop] = useState();
  const imageRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 150;

  const handleIconChange = (event) => {
    const newIcon = event.target.files?.[0];
    if (!newIcon) {
      return;
    }
    setIcon(newIcon);
    const reader = new FileReader();
    reader.onload = () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (event) => {
        const { naturalWidth, naturalHeight } = event.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 100 pixels by 100 pixels");
          return setImageUrl("");
        }
      });

      setImageUrl(imageUrl); // Set the data URL as the image URL
    };
    reader.readAsDataURL(newIcon);
  };

  const onImageLoad = (event) => {
    const { width, height } = event.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      { unit: "%", width: cropWidthInPercent },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click(); // Trigger file input click
  };

  const setCanvasPreview = (image, canvas, crop) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d Context");
    }
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Apply scaling to canvas dimensions
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.translate(-cropX, -cropY);
    //TODO: Resize image to max size of MIN_DIMENSION
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );
    console.log("setCanvasPreview complete");
  };

  return (
    <div className={styles.imageCropper} role="dialog" aria-modal="true">
      <button
        className={`${styles.cropperClose} ${styles.button}`}
        onClick={closeModal}
      >
        Close
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {!imageUrl && (
        <div className={styles.uploadInterface}>
          <button
            className={`${styles.cropperChoose} ${styles.button}`}
            onClick={handleUploadClick}
          >
            Choose Image
          </button>
        </div>
      )}
      {imageUrl && (
        <>
          <button
            className={`${styles.cropperCrop} ${styles.button}`}
            onClick={() => {
              setCanvasPreview(
                imageRef.current,
                previewCanvasRef.current,
                convertToPixelCrop(
                  crop,
                  imageRef.current.width,
                  imageRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();
              updateIcon(dataUrl);
              closeModal();
            }}
          >
            Crop Image
          </button>
          <div className={styles.cropper}>
            <ReactCrop
              crop={crop}
              keepSelection
              aspect={ASPECT_RATIO}
              onChange={(pixelCrop) => setCrop(pixelCrop)}
            >
              <img
                src={imageUrl}
                ref={imageRef}
                alt="Selected"
                style={{ maxWidth: "100%" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
        </>
      )}
      {crop && (
        <canvas
          className={styles.cropCanvas}
          ref={previewCanvasRef}
          style={{
            border: "1px solid black",
            objectFit: "contain",
            width: MIN_DIMENSION,
            height: MIN_DIMENSION,
            display: "none",
          }}
        ></canvas>
      )}
      <input
        className={styles.offScreenInput}
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleIconChange}
      />
    </div>
  );
}

export default CropModal;
