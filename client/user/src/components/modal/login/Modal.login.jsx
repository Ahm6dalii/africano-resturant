
import { Modal } from "flowbite-react";
import { useRef, useState, useEffect } from "react";
import Login from "../../../pages/login/Login";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserIcon from "../../ReactI-cons/UserIcon/UserIcon";
import './Modal.login.css'

export function LoginModal() {
  const [openModal, setOpenModal] = useState(false); // Initially false to close the modal
  const [isLoginForm, setIsLoginForm] = useState(true); // State to toggle between forms
  const { translation, language } = useSelector((state) => state.lang);
  const { mode } = useSelector((state) => state.mode);

  const modalContentRef = useRef(null); // Ref for modal content

  useEffect(() => {
    // Function to handle outside clicks
    const handleOutsideClick = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        setOpenModal(false); // Close the modal
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Cleanup listener on unmount
    };
  }, [openModal]);

  // When opening the modal, reset to login form
  const handleOpenModal = () => {
    setIsLoginForm(true); // Reset to login form by default
    setOpenModal(true); // Open the modal
  };

  return (
    <>
      <span className="inline-block text-bold text-sm sm:text-xl  md:text-xl text-orange-500" onClick={handleOpenModal}>
        <Link className="flex items-center gap-1">
        <UserIcon/>
        {translation.signIn}
        </Link> 
        </span>
      <Modal
      show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        className={`h-auto ${mode === "light" ? "" : "dark"}`}
      >
        <Modal.Header />
        <div ref={modalContentRef}>
          <Modal.Body
            dir={language === "ar" ? "rtl" : "ltr"}
            className="max-h-[500px] overflow-y-auto" // Set max height and enable scroll
          >
            <div className="space-y-6">
                <Login onSwitchToRegister={() => setIsLoginForm(false)} closeModal={()=>setOpenModal(false)} />
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
