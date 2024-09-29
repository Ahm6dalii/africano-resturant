import React, { useState } from "react";
import { Avatar, Button, Modal, FileInput } from "flowbite-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { changeProfileImg } from "../../../redux/reducers/userAuthSlice";
import { Helmet } from "react-helmet-async";
import SettingIcon from './../../../components/ReactI-cons/setting/SettingIcon';

const ProfileImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentProfileImage, setCurrentProfileImage] = useState();
  const { user, userInfo } = useSelector((state) => state.auth);
  const { translation } = useSelector(state => state.lang)

  const dispatch = useDispatch()


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

    setLoading(true)
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .put("http://localhost:3000/change-profile-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `${user}`,
        },
      })
      .then(({ data }) => {

        setLoading(false)
        dispatch(changeProfileImg(data.updatedUser.image))
        toast.success(translation.updatedImg)
        setIsModalOpen(false)
        setPreviewUrl('')
      })
      .catch((err) => {
        setLoading(false)
        if (err.response.data.message) {
          toast.error(translation.failedUpdated)
        }
      });

  };

  return (
    <>
      <Helmet>
        <title>Settings/ChangeProfileImage</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <h2 className="flex items-center gap-2  justify-center text-3xl font-semibold text-center mb-10  dark:text-orange-200">
        <SettingIcon />
        {translation.changeProfileImg}
      </h2>
      <div className="flex flex-col items-center space-y-4">
        {/* Profile Image */}
        <Avatar img={userInfo.image} size="lg" rounded={true} />
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
            <Button onClick={previewUrl && onSubmit} gradientDuoTone="purpleToBlue">
              {isLoading ? <i className="fa-solid fa-spin fa-spinner"></i> : "Submit"}
            </Button>
            <Button color="gray" onClick={closeModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </>
  );
};

export default ProfileImage;
