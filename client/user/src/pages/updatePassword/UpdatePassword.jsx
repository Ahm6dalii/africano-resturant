import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, Button, Label } from "flowbite-react";
import axios from "axios";
import { useSelector } from 'react-redux';

// Schema using Yup


const UpdatePassword = () => {
  // localization
  const { translation } = useSelector((state) => state.lang); 
  
  const schema = yup.object({
    newPassword: yup
      .string()
      .required(translation.required_password)
      .min(8, translation.min_char_pass)
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, translation.match_pass),
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
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token not found. Please log in again.");
        return;
      }

      // Send request to backend
      const response = await axios.put(
        "http://localhost:3000/update-pasword",
        {
          newPassword: data.newPassword,
        },
        {
          headers: {
            token: `${token}`,
          },
        }
      );

      // Display success message
      console.log("Password Updated:", response.data);
      alert("Password updated successfully!");
    } catch (error) {
      // Handle error
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">
        {translation.change_pass}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
      >

        {/* New Password */}
        <div className="mb-4">
          <Label htmlFor="newPassword" value={translation.new_pass} />
          <TextInput
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder={translation.new_pass}
            {...register("newPassword")}
          />
          <p className="text-red-500">{errors.newPassword?.message}</p>
        </div>

        {/* Confirm New Password */}
        <div className="mb-4">
          <Label htmlFor="confirmPassword" value={translation.confirm_pass} />
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder={translation.confirm_pass}
            {...register("confirmPassword")}
          />
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button type="submit" gradientDuoTone="purpleToBlue">
            {translation.change_pass_btn}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
