import React, { useState } from "react";
import { TextInput, Label, Button, Modal } from "flowbite-react";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";



const UpdateUserInfo = () => {

  const { translation } = useSelector((state) => state.lang);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define the validation schema for name, address, and phone number
  const schema = yup.object({
    name: yup
      .string()
      .required(translation.required_name)
      .min(2, translation.min_char_name),
    address: yup
      .string()
      .required(translation.required_address)
      .min(5, translation.min_char_address),
    phone: yup
      .string()
      .required(translation.required_phone)
      .matches(
        /^(\+?\d{1,4})?\s?\d{11}$/, ///^(010|011|012|015)\d{8}$/
        translation.match_phone
      ),
    file: yup.mixed().required(translation.required_image),
  });

  // Initialize useForm with validation onBlur and onSubmit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  // const onSubmit = async (data) => {
  //   data.file = data.file[0]; //
  //   console.log(data);
  //   // Upload image to the server using FormData
  //   // const response = await axios.post(
  //   //   "http://localhost:3000/upload",
  //   //   formData,
  //   //   {
  //   //     headers: {
  //   //       "Content-Type": "multipart/form-data",
  //   //     },
  //   //   }
  //   // );
  //   // console.log("Image uploaded:", response.data);
  //   // data.image = response.data.image; // Update the image field with the uploaded image URL

  //   // // Update user info on the server using the updated data
  //   // const response = await axios.patch(
  //   //   "http://localhost:3000/update-info",
  //   //   data,
  //   //   {
  //   //     headers: {
  //   //       Authorization: `Bearer ${token}`,
  //   //     },
  //   //   }
  //   // );
  //   // console.log("User Info Updated:", response.data);
  //   // setIsModalOpen(true); // Display success message
  //   // setIsModalOpen(true);
  //   // setIsModalOpen(true); // Display success message

  //   try {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       throw new Error("Token not found. Please log in again.");
  //     }

  //     // const response = await axios.patch(
  //     //   "http://localhost:3000/update-info",
  //     //   data,
  //     //   {
  //     //     headers: {
  //     //       "Content-Type": "multipart/form-data",
  //     //       token: `${token}`,
  //     //     },
  //     //   }
  //     // );

  //     console.log("User Info Updated:", response.data);
  //     setIsModalOpen(true);
  //   } catch (error) {
  //     console.error("Error updating user info:", error);
  //   }
  // };
  const onSubmit = (data) => {
    data.file = data.file[0];
    console.log(data);
    axios
      .patch("http://localhost:3000/update-info", data, {
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
        console.log("error");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">
        {translation.update_info}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        {/* Name field */}
        <div className="mb-4">
          <Label htmlFor="name" value={translation.name} />
          <TextInput
            id="name"
            name="name"
            type="text"
            placeholder={translation.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Address field */}
        <div className="mb-4">
          <Label htmlFor="address" value={translation.address} />
          <TextInput
            id="address"
            name="address"
            type="text"
            placeholder={translation.address}
            {...register("address")}
          />
          {errors.address && (
            <p className="mt-2 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Phone number field */}
        <div className="mb-4">
          <Label htmlFor="phone" value={translation.phone} />
          <TextInput
            id="phone"
            name="phone"
            type="text"
            placeholder={translation.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Image field */}
        <div className="mb-4">
          <Label htmlFor="image" value={translation.image} />
          <input
            id="file"
            name="file"
            type="file"
            accept="file/*"
            placeholder={translation.image}
            {...register("file")}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          {errors.image && (
            <p className="mt-2 text-sm text-red-500">{errors.image.message}</p>
          )}
        </div>

        <div className="text-center">
          <Button type="submit" gradientDuoTone="purpleToBlue">
            {translation.updateButton}
          </Button>
        </div>
      </form>

      {/* Modal for success message */}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="md"
        popup={true}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {translation.successMessage}
            </h3>
            <Button
              onClick={() => setIsModalOpen(false)}
              gradientDuoTone="purpleToBlue"
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateUserInfo;
