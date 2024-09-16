
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { translation } = useSelector(state => state.lang)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);  // For loading state
  const [errorMessage, setErrorMessage] = useState("");  // For error state
  const navigate=useNavigate()

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
      address:'',
      // confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, `${translation.maxName } `)
        .min(3, `${translation.minName } `)
        .required(`${translation.requireFname } `),
      lastName: Yup.string()
        .max(15, `${translation.maxName } `)
        .min(3, `${translation.minName } `)
        .required(`${translation.requireLname } `),
      email: Yup.string()
      .email(`${translation.invalidEmail } `)
      .required(`${translation.reqEmail } `),
      phoneNumber: Yup.string()
      .matches(/^01\d{9}$/, `${translation.invalidPhone}`) // Phone number must start with "01" and have exactly 11 digits
      .required(`${translation.reqPhone}`),
      password: Yup.string()
        .min(8, `${translation.minPassword } `)
        .matches(/[a-zA-Z]/, `${translation.containLetters } `)
        .matches(/\d/, `${translation.containNumbers } `)
        .required( `${translation.reqPassword } `),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], `${translation.matchPassword } `)
        .required(`${translation.reqConfirmPassword } `),
        address:Yup.string()
    }),
    onSubmit: async (values) => {
      const formObj = {
        name:` ${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
        phone: values.phoneNumber,
        address:values.address
    };

      console.log(formObj);
      console.log(values);
      setLoading(true);  
      const { confirmPassword, ...formData } = values;

      try {
        
        const response = await axios.post('http://localhost:3000/signup', formObj);
        console.log('Success:', response.data);
        alert('Signup successful!');
        navigate('/')
      } catch (error) {
        
        console.error('Error:', error.response ? error.response.data : error.message);
        setErrorMessage('Signup failed. Please try again.'); 
      } finally {
        setLoading(false);  
      }
    },
   
  });

  return (
    <div className="flex justify-center items-center py-6  ">
      <form
        onSubmit={formik.handleSubmit}
        className="border-solid border-2  p-8 rounded-lg shadow-2xl max-w-md  w-full dark:text-black"
      >
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">{translation.register } </h2>

        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 dark:text-white">
          {translation.fristName }
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
              formik.touched.firstName && formik.errors.firstName
                ? 'border-red-500'
                : ''
            }`}
            {...formik.getFieldProps('firstName')}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.firstName}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 dark:text-white">
          {translation.lastName }
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
              formik.touched.lastName && formik.errors.lastName
                ? 'border-red-500'
                : ''
            }`}
            {...formik.getFieldProps('lastName')}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.lastName}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 dark:text-white">
          {translation.email }
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
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

         {/* Phone Number */}
         <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 dark:text-white">
            {translation.phoneNumber}
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? 'border-red-500'
                : ''
            }`}
            {...formik.getFieldProps('phoneNumber')}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
          ) : null}
        </div>


        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 dark:text-white">
          {translation.Password }
          </label>
              <div className='relative'>  
                <input
                  id="password"
                  name="password"
                  type={showPassword?"text":"password"}
                  className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-500'
                      : ''
                  }`}
                  {...formik.getFieldProps('password')}
                />
                  <div className="absolute top-0 right-0 p-2">
                      <button className="m-0 p-0">
                          <i onClick={handleShowPassword} className="fas text-dark fa-eye"></i>
                      </button>
                  </div>
                </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-white">
          {translation.confirmPassword }
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? 'border-red-500'
                : ''
            }`}
            {...formik.getFieldProps('confirmPassword')}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700"
        >
          {translation.signUp }
        </button>
        <p className='dark:text-white'>{translation.haveAccount } <span className='text-blue-500 hover:text-blue-700'><a href="/login">{translation.signIn }</a></span></p> 
      </form>
    </div>
  );
};

export default Register;





 // Make the POST request to your backend API
     // Success response handling
     // Handle error
      // Show error message
      // Hide loading spinner
