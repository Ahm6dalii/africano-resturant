

import { Button, Modal } from "flowbite-react";
import {  useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function LoginFirstModal() {
  const [openModal, setOpenModal] = useState(false);

  


  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              You should Login First
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="#d03801" onClick={() => setOpenModal(false)}>
                {"Sign In"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
