import React, { useState } from "react";
import { TextInput, Label, Button, Modal, List } from "flowbite-react";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { HiXCircle } from "react-icons/hi";
import toast from "react-hot-toast";
import { changeProfileInfo } from "../../../redux/reducers/userAuthSlice";
import AddressIcon from "./../../../components/ReactI-cons/AdressIcon/AddressIcon";
import { Helmet } from "react-helmet-async";
import SettingIcon from './../../../components/ReactI-cons/setting/SettingIcon';
import LabelIcon from './../../../components/ReactI-cons/label/LabelIcon';
import PhoneIcon from './../../../components/ReactI-cons/phoneIcon/PhoneIcon';

const UpdateUserInfo = () => {
  const { translation } = useSelector((state) => state.lang);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, userInfo } = useSelector((state) => state.auth);
  const { link } = useSelector((state) => state.apiLink);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // Define the validation schema for name, address, and phone number
  const schema = yup.object({
    name: yup
      .string()
      .required(translation.required_name)
      .min(3, translation.min_char_name)
      .matches(/^[A-Za-z]+$/, translation.characters_only),
    address: yup
      .string()
      .required(translation.required_address)
      .min(5, translation.min_char_address),
    phone: yup
      .string()
      .required(translation.required_phone)
      .matches(/^(010|011|012|015)\d{8}$/, `${translation.invalidPhone}`),
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

  const onSubmit = (data) => {
    setLoading(true);

    axios
      .patch(`${link}/update-info`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `${user}`,
        },
      })
      .then(({ data }) => {
        const { name, address, phone } = data.updatedUser;
        dispatch(changeProfileInfo({ name, address, phone }));
        setLoading(false);
        toast.success(translation.userUpdated);
      })
      .catch((err) => {
        setLoading(false);
        if (err?.response?.data.message) {
          toast.error("Faile to Update User Info");
        }
      });
  };

  return (
    <div className="container mx-auto p-4 dark:text-black">
      <Helmet>
        <title>Settings/updateUser</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <h1 className="flex items-center gap-2  justify-center text-3xl font-semibold text-center mb-3  dark:text-orange-200 ">
        <SettingIcon />
        {translation.update_info}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto dark:bg p-8 rounded-lg "
      >
        {/* Name field */}
        <div className="mb-4">
          <div className="flex items-center gap-1">
            <LabelIcon></LabelIcon>
            <LabelIcon
              className="dark:text-white"
              htmlFor="name"
              value={translation.name}
            />
          </div>
          <TextInput
            id="name"
            name="name"
            type="text"
            color={"white"}
            placeholder={translation.name}
            {...register("name")}
          />
          {errors.name && (
            <List>
              <List.Item
                className="text-red-600 flex  text-sm   dark:text-red-500 capitalize mb-2"
                icon={HiXCircle}
              >
                {errors.name.message}
              </List.Item>
            </List>
          )}
        </div>

        {/* Address field */}
        <div className="mb-4">
          <div className="flex items-center gap-1">
            <AddressIcon />
            <Label
              className="dark:text-white"
              htmlFor="address"
              value={translation.address}
            />
          </div>
          <TextInput
            id="address"
            name="address"
            type="text"
            color={"white"}
            placeholder={translation.address}
            {...register("address")}
          />
          {errors.address && (
            <List>
              <List.Item
                className="text-red-600 flex  text-sm  dark:text-red-500 capitalize mb-2"
                icon={HiXCircle}
              >
                {errors.address.message}
              </List.Item>
            </List>
          )}
        </div>

        {/* Phone number field */}
        <div className="mb-4">
          <div className="flex items-center gap-1">
            <PhoneIcon></PhoneIcon>
            <Label
              className="dark:text-white "
              htmlFor="phone"
              value={translation.phone}
            />
          </div>
          <TextInput
            id="phone"
            name="phone"
            type="text"
            className=""
            color={"white"}
            placeholder={translation.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <List>
              <List.Item
                className="text-red-600 flex  text-sm   dark:text-red-500 capitalize mb-2"
                icon={HiXCircle}
              >
                {errors.phone.message}
              </List.Item>
            </List>
          )}
        </div>

        <div className="text-center">
          <Button
            disabled={isLoading}
            type="submit"
            gradientDuoTone="purpleToBlue"
          >
            {isLoading ? (
              <i className="fa-solid fa-spin fa-spinner"></i>
            ) : (
              translation.updateButton
            )}
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
