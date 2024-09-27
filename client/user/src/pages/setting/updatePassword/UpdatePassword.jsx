import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput, Button, Label, List } from "flowbite-react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import SettingIcon from "../../../components/ReactI-cons/setting/settingIcon";
import LockIcon from "../../../components/ReactI-cons/lockIcon/LockIcon";
import { HiXCircle } from "react-icons/hi";
import { toast } from 'react-hot-toast';

// Schema using Yup


const UpdatePassword = () => {
  // localization
  const { translation } = useSelector((state) => state.lang); 
  const { user,userInfo } = useSelector((state) => state.auth);
  const {link } = useSelector(state => state.apiLink)
  const [isLoading, setLoading] = useState(false);
  const dispatch=useDispatch()
  
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
    setLoading(true)

    try {
      // Send request to backend
      const response = await axios.put(
        `${link}/update-pasword`,
        {
          newPassword: data.newPassword,
        },
        {
          headers: {
            token: `${user}`,
          },
        }
      );

      // Display success message
      toast.success(translation.passwordUpdated)
      setLoading(false)
    } catch (error) {
      // Handle error
      setLoading(false)
      if(error?.response?.data?.message){
        toast.error(translation.passwordUpdateFail)
      }
      
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="flex items-center gap-2  justify-center text-3xl font-semibold text-center mb-6  dark:text-orange-200">
      <SettingIcon/>
        {translation.change_pass}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto  p-8 rounded-lg "
      >

        {/* New Password */}
        <div className="mb-4">
        <div className="flex items-center gap-1">
          <LockIcon/>
          <Label htmlFor="newPassword" value={translation.new_pass} />
        </div>
          <TextInput
            id="newPassword"
            name="newPassword"
            type="password"
            color={'white'}
            className="text-black"
            placeholder={translation.new_pass}
            {...register("newPassword")}
          />
          {errors.newPassword&&
              <List   >
              <List.Item className='text-red-600 flex  text-sm  dark:text-red-500 capitalize mb-2' icon={HiXCircle}>{errors.newPassword?.message}</List.Item>
            </List> 
          }
        </div>

        {/* Confirm New Password */}
        <div className="mb-4">
        <div className="flex items-center gap-1">
        <LockIcon/>
        <Label htmlFor="confirmPassword" value={translation.confirm_pass} />
        </div>
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            color={'white'}
            className="text-black"
            placeholder={translation.confirm_pass}
            {...register("confirmPassword")}
          />
           {errors.confirmPassword&&
              <List   >
              <List.Item className='text-red-600 flex  text-sm  dark:text-red-500 capitalize mb-2' icon={HiXCircle}>{errors.confirmPassword?.message}</List.Item>
            </List> 
          }
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button disabled={isLoading} type="submit" gradientDuoTone="purpleToBlue">
            {isLoading? <i className="fa-solid fa-spin fa-spinner"></i>:translation.change_pass_btn}
           
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;