import React, { useState, useRef } from "react";
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import "../styles/ReactCrop.css";
import "../styles/imageCropperDisplay.css";

// Main App Component
function ImageCropper() {
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [icon, setIcon] = useState(null);
  const [crop, setCrop] = useState();
  const imageRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 100;

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
    const cropWidthInPercent = MIN_DIMENSION / width;
    const crop = makeAspectCrop(
      { unit: "px", width: MIN_DIMENSION },
      ASPECT_RATIO,
      width,
      height
    );
    setCrop(crop);
  };

  const handleUploadClick = () => {
    console.log("Clicked");
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

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.translate(-cropX, -cropY);
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
  };

  return (
    <div className="imageCropper" onClick={handleUploadClick}>
      {error && <p className="error">{error}</p>}
      {imageUrl && (
        <>
          <ReactCrop
            crop={crop}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
            onChange={(pixelCrop, percentCrop) => setCrop(pixelCrop)}
          >
            <img
              src={imageUrl}
              ref={imageRef}
              alt="Selected"
              style={{ maxWidth: "100%" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            onClick={() => {
              setCanvasPreview(
                imageRef.current,
                previewCanvasRef.current,
                crop
              );
            }}
          >
            Crop Image
          </button>
        </>
      )}
      {crop && (
        <canvas
          className="cropCanvas"
          ref={previewCanvasRef}
          style={{
            border: "1px solid black",
            objectFit: "contain",
            width: MIN_DIMENSION,
            height: MIN_DIMENSION,
          }}
        ></canvas>
      )}
      <input
        className="offScreenInput"
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleIconChange}
      />
    </div>
  );
}

export default ImageCropper;
