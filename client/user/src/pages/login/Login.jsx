import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { List } from 'flowbite-react';
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import EmailIcon from '../../components/ReactI-cons/EmailIcon/EmailIcon';
import LockIcon from '../../components/ReactI-cons/lockIcon/LockIcon';
import toast from 'react-hot-toast';
import { setUser } from '../../redux/reducers/userAuthSlice';

const Login = ({ onSwitchToRegister, closeModal }) => {
  const { translation } = useSelector(state => state.lang)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { link } = useSelector(state => state.apiLink)
  const [errorMessage, setErrorMessage] = useState("");  // For error state 
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(`${translation.invalidEmail} `)
        .required(`${translation.reqEmail} `),
      password: Yup.string()
        .min(8, `${translation.minPassword} `)
        .matches(/[a-zA-Z]/, `${translation.containLetters} `)
        .matches(/\d/, `${translation.containNumbers} `)
        .required(`${translation.reqPassword} `),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      setErrorMessage('')
      try {
        const { data } = await axios.post(`${link}/signin`, values);
        console.log(data);
        dispatch(setUser(data?.token))
        toast.success("User Login Successfuly !")
        navigate('/')
        closeModal()
      } catch (error) {
        console.log(error);
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message)
        }
        setErrorMessage(error.response?.data?.message)
      } finally {
        setLoading(false)
      }
    },
  });

  return (
    <div className="flex justify-center items-center pt-6">
      <form
        onSubmit={formik.handleSubmit}
        className="border-solid  p-4 rounded-lg   max-w-md w-full dark:text-black"
      >

        <h2 className="text-2xl font-bold mb-6 text-center flex items-center gap-3 justify-center dark:text-white">
          <svg className="w-6 h-6 text-gray-800  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          {translation.signIn}</h2>

        <div className="mb-4">

          <label htmlFor="email" className="flex items-center gap-2 text-gray-700 dark:text-white ">
            <EmailIcon />
            {translation.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200  ${formik.touched.email && formik.errors.email
                ? 'border-red-500'
                : ''
              }`}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <List>
              <List.Item className='text-red-600' icon={HiXCircle}>{formik.errors.email}</List.Item>
            </List>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="flex items-center gap-2 text-gray-700 dark:text-white">
            <LockIcon />
            {translation.Password}
          </label>
          <div className='relative'>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200  ${formik.touched.password && formik.errors.password
                  ? 'border-red-500'
                  : ''
                }`}
              {...formik.getFieldProps('password')}
            />
            <div className="absolute top-0 right-0 p-2">
              <button type='button' className="m-0 p-0">
                <i onClick={handleShowPassword} className="fas text-dark fa-eye"></i>
              </button>
            </div>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <List>
              <List.Item className='text-red-600' icon={HiXCircle}>{formik.errors.password}</List.Item>
            </List>
          ) : null}
        </div>
        {errorMessage ?
          <List   >
            <List.Item className='text-red-600 flex w-fit text-md m-auto b dark:text-red-500 capitalize mb-2' icon={HiXCircle}>{errorMessage}</List.Item>
          </List> : null}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700"
        >
          {loading ? <i className='fa-solid fa-spin fa-spinner'></i> : translation.signIn}
        </button>

        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-blue-500 hover:text-blue-700 dark:text-yellow-200">
            {translation.forgetPassword}
          </a>
          {/* <p className='dark:text-white'  onClick={onSwitchToRegister}>{translation.newToAfricano }  <span className='text-blue-500 hover:text-blue-700 dark:text-yellow-200'>{translation.joinNow}</span></p>  */}
          <p className='dark:text-white'  >{translation.newToAfricano}  <span className='text-blue-500 hover:text-blue-700 dark:text-yellow-200'> <Link to='/register' onClick={closeModal}>{translation.joinNow}</Link></span></p>


        </div>

      </form>
    </div>
  );
};

export default Login;
