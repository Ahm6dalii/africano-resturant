
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .min(3, 'Must be 3 characters or more')
        .required('Required'),
      lastName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .min(3, 'Must be 3 characters or more')

        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        onSubmit={formik.handleSubmit}
        className="border-solid border-2  p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700">
            First Name
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
          <label htmlFor="lastName" className="block text-gray-700">
            Last Name
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
          <label htmlFor="email" className="block text-gray-700">
            Email Address
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

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
              formik.touched.password && formik.errors.password
                ? 'border-red-500'
                : ''
            }`}
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password
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
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

