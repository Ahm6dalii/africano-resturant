import React, { useState } from "react";
import { Avatar, Button, Modal, FileInput } from "flowbite-react";
import axios from "axios"; 

const ProfileImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentProfileImage, setCurrentProfileImage] = useState();

  // Handle opening and closing the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle image selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle form submission (upload the image)
  const onSubmit = async () => {

    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .put("http://localhost:3000/change-profile-img", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiN2FtYm96byIsImVtYWlsIjoiYWhtZWRAZ21haWwuY29tIiwidXNlcklkIjoiNjZkZDZkNzZjMTBiOTJmZjJhYzFiZmEwIiwiaWF0IjoxNzI1OTczOTI3fQ.frwSYsfA2frNOH6bHcbbMwyJHjCVrCWijCi3IcsHiqM",
        },
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("error" , err);
      });

  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Profile Image */}
      <Avatar img={currentProfileImage} size="lg" rounded={true} />
      <Button onClick={openModal} gradientDuoTone="purpleToBlue">
        Change Image
      </Button>

      {/* Modal for uploading new image */}
      <Modal show={isModalOpen} size="md" onClose={closeModal}>
        <Modal.Header>Change Profile Image</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            {/* File Input for Image Upload */}
            <FileInput
              id="profileImage"
              accept="image/*"
              onChange={handleFileChange}
            />
            {/* Image Preview */}
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-40 h-40 rounded-full shadow-lg mx-auto"
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSubmit} gradientDuoTone="purpleToBlue">
            Submit
          </Button>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileImage;
