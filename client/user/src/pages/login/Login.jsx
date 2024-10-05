import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { List } from 'flowbite-react';
import { HiXCircle } from "react-icons/hi";
import toast from 'react-hot-toast';
import { setUser } from '../../redux/reducers/userAuthSlice';
import { Helmet } from 'react-helmet-async';
import EmailIcon from './../../components/ReactI-cons/EmailIcon/EmailIcon';
import LockIcon from './../../components/ReactI-cons/lockIcon/LockIcon';


const Login = ({ closeModal }) => {

  const { translation, language } = useSelector(state => state.lang)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { link } = useSelector(state => state.apiLink)
  const [errorMessage, setErrorMessage] = useState("");  // For error state 
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const currentPath = pathname.split('/').slice(2).join('/');

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
        dispatch(setUser(data?.token))
        toast.success(translation.userLoign)
        currentPath ? navigate(`/${currentPath}`) : navigate(`/`);
        closeModal()
      } catch (error) {
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
      <Helmet>
        <title>Login</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <form
        onSubmit={formik.handleSubmit}
        className="border-solid  p-4 rounded-lg   max-w-md w-full dark:text-black"
      >

        <h2 className="text-4xl font-bold mb-6 text-center flex items-center gap-3 justify-center text-red-900 dark:text-orange-200">
          <svg className="w-6 h-6  text-red-900  dark:text-orange-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
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
            <div className={`absolute top-0 ${language == 'en' ? 'right-0' : 'left-0'} p-2`}>
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
          className=" w-full bg-red-900 hover:bg-red-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white py-2 px-4 rounded-full "
        >
          {loading ? <i className='fa-solid fa-spin fa-spinner'></i> : translation.signIn}
        </button>



        <div className="mt-4 text-center">
          <Link onClick={() => closeModal()} to="/forgot-password/resetPass" className="text-orange-500 hover:text-orange-700 dark:text-yellow-200">
            {translation.forgetPassword}
          </Link>
          {/* <p className='dark:text-white'  onClick={onSwitchToRegister}>{translation.newToAfricano }  <span className='text-blue-500 hover:text-blue-700 dark:text-yellow-200'>{translation.joinNow}</span></p>  */}
          <p className='dark:text-white'  >{translation.newToAfricano}  <span className='text-orange-500 hover:text-orange-700 dark:text-yellow-200'> <Link to='/register' onClick={closeModal}>{translation.joinNow}</Link></span></p>


        </div>

      </form>
    </div>
  );
};

export default Login;
