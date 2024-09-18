import  { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {  useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ForgetPass = () => {
  const { translation } = useSelector(state => state.lang)
 const [errorMessage,setErrorMessage]=useState('')
 const [isloading,setIsLoading]=useState(false)
 const {path}=useParams()
 console.log(path);
 
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(`${translation.invalidEmail } `)
        .required(`${translation.reqEmail } `),
    }),
    onSubmit: async (values) => {
        setIsLoading(true)
        try {
            const response = await axios.post('http://localhost:3000/reset-password/request', values);
            console.log(response.data.message);
            toast.success(translation.otpsucess, {
            duration: 4000,
            position: 'top-right',})
            setIsLoading(false)
            setTimeout(() => {
                navigate(`/${path}`)
            }, 1500);
            
        } catch (error) {
            console.error( error);
            setErrorMessage(translation.invalidEmail)
            setIsLoading(false)
      }
    },
  });

  return (
    <div className="flex justify-center items-center pt-6">
      <form
        onSubmit={formik.handleSubmit}
        className="border-solid border-2 p-8 rounded-lg shadow-2xl max-w-md w-full dark:text-black"
      >
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">{translation.sendotpforchange }</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 dark:text-white ">
          {translation.email }
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200  ${
              formik.touched.email && formik.errors.email
                ? 'border-red-500'
                : ''
            }`}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          ) : null}
        </div>
        <p className='text-red-500 text-sm mt-1'>{errorMessage}</p>
        <Toaster />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700"
        >
          {isloading? <i className='fas fa-spin fa-spinner'></i>:translation.sendotp}
        </button>
        
      </form>
    </div>
  );
};

export default ForgetPass;
