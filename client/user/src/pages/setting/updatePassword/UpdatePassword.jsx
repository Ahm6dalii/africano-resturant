import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, Button, Label, List } from "flowbite-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import SettingIcon from './../../../components/ReactI-cons/setting/SettingIcon';
import LockIcon from './../../../components/ReactI-cons/lockIcon/LockIcon';
import { HiEye, HiEyeOff, HiXCircle } from "react-icons/hi";

const UpdatePassword = () => {
  // localization
  const { translation } = useSelector((state) => state.lang);
  const { user } = useSelector((state) => state.auth);
  const { link } = useSelector((state) => state.apiLink);
  const [isLoading, setLoading] = useState(false);

  // States to manage password visibility
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Schema using Yup
  const schema = yup.object({
    newPassword: yup
      .string()
      .required(translation.required_password)
      .min(8, translation.min_char_pass)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        translation.match_pass
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], translation.match_confirm_pass)
      .required(translation.required_confirm_pass),
  });

  // Using react-hook-form with yup for validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Send request to backend
      const response = await axios.put(
        `${link}/update-pasword`,
        { newPassword: data.newPassword },
        { headers: { token: `${user}` } }
      );
      // Display success message
      toast.success(translation.passwordUpdated);
      setLoading(false);
    } catch (error) {
      // Handle error
      setLoading(false);
      if (error?.response?.data?.message) {
        toast.error(translation.passwordUpdateFail);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Settings/updatePassword</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <h2 className="flex items-center gap-2 justify-center text-3xl font-semibold text-center mb-6 dark:text-orange-200">
        <SettingIcon />
        {translation.change_pass}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-8 rounded-lg"
      >
        {/* New Password */}
        <div className="mb-4">
          <div className="flex items-center gap-1">
            <LockIcon />
            <Label htmlFor="newPassword" value={translation.new_pass} />
          </div>
          <div className="relative">
            <TextInput
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              color={"white"}
              className="text-black"
              placeholder={translation.new_pass}
              {...register("newPassword")}
              style={{ paddingRight: "2.5rem" }} // Add padding to the right
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>
          {errors.newPassword && (
            <List>
              <List.Item
                className="text-red-600 flex text-sm dark:text-red-500 capitalize mb-2"
                icon={HiXCircle}
              >
                {errors.newPassword?.message}
              </List.Item>
            </List>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="mb-4">
          <div className="flex items-center gap-1">
            <LockIcon />
            <Label htmlFor="confirmPassword" value={translation.confirm_pass} />
          </div>
          <div className="relative">
            <TextInput
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              color={"white"}
              className="text-black"
              placeholder={translation.confirm_pass}
              {...register("confirmPassword")}
              style={{ paddingRight: "2.5rem" }} // Add padding to the right
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <List>
              <List.Item
                className="text-red-600 flex text-sm dark:text-red-500 capitalize mb-2"
                icon={HiXCircle}
              >
                {errors.confirmPassword?.message}
              </List.Item>
            </List>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            disabled={isLoading}
            type="submit"
            gradientDuoTone="purpleToBlue"
          >
            {isLoading ? (
              <i className="fa-solid fa-spin fa-spinner"></i>
            ) : (
              translation.change_pass_btn
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
