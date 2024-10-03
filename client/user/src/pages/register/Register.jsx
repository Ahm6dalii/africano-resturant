import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import toast, { LoaderIcon } from 'react-hot-toast';
import LockIcon from './../../components/ReactI-cons/lockIcon/LockIcon';
import { List } from 'flowbite-react';
import { HiXCircle } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';
import LabelIcon from './../../components/ReactI-cons/label/LabelIcon';
import EmailIcon from './../../components/ReactI-cons/EmailIcon/EmailIcon';
import PhoneIcon from './../../components/ReactI-cons/phoneIcon/PhoneIcon';
const Register = ({ setOpenModal }) => {
  const { translation, language } = useSelector(state => state.lang)
  const { link } = useSelector(state => state.apiLink)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);  // For loading state
  const [errorMessage, setErrorMessage] = useState("");  // For error state 
  const navigate = useNavigate()
  let disableTimeOut;

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const formik = useFormik({

    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      address: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, `${translation.maxName} `)
        .min(3, `${translation.minName} `)
        .required(`${translation.requireFname} `),
      lastName: Yup.string()
        .max(15, `${translation.maxName} `)
        .min(3, `${translation.minName} `)
        .required(`${translation.requireLname} `),
      email: Yup.string()
        .email(`${translation.invalidEmail} `)
        .required(`${translation.reqEmail} `),
      phoneNumber: Yup.string()
        .matches(/^(010|011|012|015)\d{8}$/, `${translation.invalidPhone}`) // Phone number must start with "01" and have exactly 11 digits
        .required(`${translation.reqPhone}`),
      password: Yup.string()
        .min(8, `${translation.minPassword} `)
        .matches(/[a-zA-Z]/, `${translation.containLetters} `)
        .matches(/\d/, `${translation.containNumbers} `)
        .required(`${translation.reqPassword} `),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], `${translation.matchPassword} `)
        .required(`${translation.reqConfirmPassword} `),
      address: Yup.string()
    }),
    onSubmit: async (values) => {
      const formObj = {
        name: ` ${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
        phone: values.phoneNumber,
        address: values.address
      };


      setLoading(true);
      setErrorMessage('')
      const { confirmPassword, ...formData } = values;

      try {

        const response = await axios.post(`${link}/signup`, formObj);

        toast.success(translation.userCreated)
        disableTimeOut = setTimeout(() => {
          navigate('/confirm')
        }, 1000);
      } catch (error) {
        toast.error(error.response?.data?.message)
        setErrorMessage(error.response?.data?.message);


      } finally {
        setLoading(false);
      }
    },

  });
  useEffect(() => {
    return () => {
      clearTimeout(disableTimeOut)
    }
  }, [])

  return (
    <div className="flex justify-center items-center ">
      <Helmet>
        <title>Register</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <form
        onSubmit={formik.handleSubmit}
        className=" p-8 rounded-lg  max-w-md  w-full dark:text-black"
      >

        <h2 className="text-4xl font-bold mb-6 text-center text-red-900 dark:text-orange-200 flex items-center gap-2 justify-center">
          <svg className="w-6 h-6 text-red-900 dark:text-orange-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>

          {translation.register} </h2>

        <div className="mb-4">
          <label htmlFor="firstName" className="flex gap-1 items-center text-gray-700 dark:text-white">
            <LabelIcon />
            {translation.fristName}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${formik.touched.firstName && formik.errors.firstName
              ? 'border-red-500'
              : ''
              }`}
            {...formik.getFieldProps('firstName')}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <List>
              <List.Item className='text-red-600 dark:text-red-500 ' icon={HiXCircle}>{formik.errors.firstName}</List.Item>
            </List>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className=" text-gray-700 dark:text-white flex gap-1 items-center">
            <LabelIcon />
            {translation.lastName}
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${formik.touched.lastName && formik.errors.lastName
              ? 'border-red-500'
              : ''
              }`}
            {...formik.getFieldProps('lastName')}
          />
          {formik.touched.lastName && formik.errors.lastName ? (

            <List>
              <List.Item className='text-red-600 dark:text-red-500' icon={HiXCircle}>{formik.errors.lastName}</List.Item>
            </List>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="flex gap-1 items-center text-gray-700 dark:text-white">
            <EmailIcon />
            {translation.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${formik.touched.email && formik.errors.email
              ? 'border-red-500'
              : ''
              }`}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <List>
              <List.Item className='text-red-600 dark:text-red-500' icon={HiXCircle}>{formik.errors.email}</List.Item>
            </List>
          ) : null}
        </div>

        {/* Phone Number */}
        <div className="mb-4">

          <label htmlFor="phoneNumber" className="flex gap-1 items-center text-gray-700 dark:text-white">
            <PhoneIcon />
            {translation.phoneNumber}
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${formik.touched.phoneNumber && formik.errors.phoneNumber
              ? 'border-red-500'
              : ''
              }`}
            {...formik.getFieldProps('phoneNumber')}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <List>
              <List.Item className='text-red-600 dark:text-red-500 ' icon={HiXCircle}>{formik.errors.phoneNumber}</List.Item>
            </List>
          ) : null}
        </div>


        <div className="mb-4">
          <label htmlFor="password" className="flex gap-1 items-center text-gray-700 dark:text-white">
            <LockIcon />

            {translation.Password}
          </label>
          <div className='relative'>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${formik.touched.password && formik.errors.password
                ? 'border-red-500'
                : ''
                }`}
              {...formik.getFieldProps('password')}
            />
            <div className={`absolute top-0 ${language == 'en' ? 'right-0' : 'left-0'} p-2`}>
              <button type='button' className="m-0 p-0">
                <i onClick={handleShowPassword} className="fas text-dark fa-eye"></i>
              </button>
            </div>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <List>
              <List.Item className='text-red-600 dark:text-red-500 ' icon={HiXCircle}>{formik.errors.password}</List.Item>
            </List>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="flex gap-1 items-center text-gray-700 dark:text-white">
            <LockIcon />
            {translation.confirmPassword}
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${formik.touched.confirmPassword && formik.errors.confirmPassword
              ? 'border-red-500'
              : ''
              }`}
            {...formik.getFieldProps('confirmPassword')}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (

            <List>
              <List.Item className='text-red-600 dark:text-red-500' icon={HiXCircle}>{formik.errors.confirmPassword}</List.Item>
            </List>
          ) : null}
        </div>

        {errorMessage ?
          <List   >
            <List.Item className='text-red-600 flex w-fit text-xl m-auto b dark:text-red-500 capitalize mb-2' icon={HiXCircle}>{errorMessage}</List.Item>
          </List> : null}
        <button
          type="submit"
          className="w-full mb-4 bg-red-900 hover:bg-red-700 dark:bg-yellow-400 dark:hover:bg-yellow-500  text-white py-2 px-4 rounded-full "
        >
          {loading ? <i className='fa-solid fa-spin fa-spinner'></i>
            : translation.signUp}

        </button>
        <p onClick={setOpenModal} className='dark:text-white'>{translation.haveAccount}   <span className='text-orange-500 hover:text-orange-700 dark:text-yellow-200'><Link to={'/'}> {translation.home}</Link></span></p>
      </form>
    </div>
  );
};

export default Register;





