import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const { translation } = useSelector(state => state.lang)
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
} 
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(`${translation.invalidEmail } `)
        .required(`${translation.reqEmail } `),
      password: Yup.string()
        .min(8, `${translation.minPassword } `)
        .matches(/[a-zA-Z]/, `${translation.containLetters } `)
        .matches(/\d/, `${translation.containNumbers } `)
        .required(`${translation.reqPassword } `),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3000/signin', values);
        alert('Login successful: ' + JSON.stringify(response.data, null, 2));
        navigate('/')
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed: ' + error.response?.data?.message || 'An error occurred');
      }
    },
  });

  return (
    <div className="flex justify-center items-center pt-6">
      <form
        onSubmit={formik.handleSubmit}
        className="border-solid border-2 p-8 rounded-lg shadow-2xl max-w-md w-full dark:text-black"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">{translation.signIn }</h2>

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
            
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 dark:text-white">
          {translation.Password }
          </label>
              <div className='relative'>
                  <input
                    id="password"
                    name="password"
                    type={showPassword?"text":"password"}
                    className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200  ${
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
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700"
        >
          {translation.signIn }
        </button>

        <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-blue-500 hover:text-blue-700">
          {translation.forgetPassword }
          </a>
          <p className='dark:text-white'>{translation.newToAfricano }  <span className='text-blue-500 hover:text-blue-700'><a href="/register">{translation.joinNow }</a></span></p> 
        </div>
        
      </form>
    </div>
  );
};

export default Login;
