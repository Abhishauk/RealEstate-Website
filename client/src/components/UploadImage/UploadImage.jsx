import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group, Notification } from "@mantine/core";

const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);
  const [error, setError] = useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };

  useEffect(() => {
    // Check if Cloudinary script is loaded
    if (!window.cloudinary) {
      setError("Cloudinary is not loaded. Please ensure the script is included.");
      console.error("Cloudinary script not found.");
      return;
    }

    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDNAME,
        uploadPreset: import.meta.env.VITE_UPLOADPRESET,
        maxFiles: 1,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          setError(error.message || "An error occurred during upload.");
          return;
        }
        if (result.event === "success") {
          setImageURL(result.info.secure_url);
          setError(null); // Clear any previous errors
        }
      }
    );
  }, []);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    } else {
      setError("Upload widget is not initialized.");
      console.error("Upload widget not initialized.");
    }
  };

  return (
    <div className="flexColCenter uploadWrapper">
      {error && (
        <Notification color="red" onClose={() => setError(null)}>
          {error}
        </Notification>
      )}

      {!imageURL ? (
        <div className="flexColCenter uploadZone" onClick={openWidget}>
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div className="uploadedImage" onClick={openWidget}>
          <img src={imageURL} alt="Uploaded" />
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!imageURL}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
