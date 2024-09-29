import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import EmailIcon from '../../components/ReactI-cons/EmailIcon/EmailIcon';
import MessageIcon from '../../components/ReactI-cons/Message/MessageIcon';
import { List } from 'flowbite-react';
import { HiXCircle } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';

const ForgetPass = () => {
  const { translation } = useSelector(state => state.lang)
  const [errorMessage, setErrorMessage] = useState('')
  const [isloading, setIsLoading] = useState(false)
  const { link } = useSelector(state => state.apiLink)

  const { path } = useParams()
  //  

  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(`${translation.invalidEmail} `)
        .required(`${translation.reqEmail} `),
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const response = await axios.post(`${link}/reset-password/request`, values);
        // 
        toast.success(translation.otpsucess, {
          duration: 4000,
          position: 'top-right',
        })
        setIsLoading(false)
        navigate(`/${path}`)
      } catch (error) {
        // console.error( error);
        setErrorMessage(translation.invalidEmail)
        setIsLoading(false)
      }
    },
  });

  return (
    <div className="flex justify-center items-center pt-6">
      <Helmet>
        <title>Forgot Password</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <form
        onSubmit={formik.handleSubmit}
        className=" p-8 rounded-lg  max-w-md w-full dark:text-black"
      >
        <h2 className="flex text-red-900 items-center gap-1 justify-center text-2xl font-bold mb-6 text-center dark:text-orange-200">
          <MessageIcon />
          {translation.sendotpforchange}
        </h2>

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
            <List   >
              <List.Item className='text-red-600 flex  text-sm   dark:text-red-500 capitalize mb-2' icon={HiXCircle}>{formik.errors.email}</List.Item>
            </List>
          ) : null}
        </div>
        <p className='text-red-500 text-sm mt-1'>{errorMessage}</p>
        <button
          type="submit"
          disabled={isloading}
          className="w-full bg-red-900 hover:bg-red-700-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white py-2 px-4 rounded-full "
        >
          {isloading ? <i className='fas fa-spin fa-spinner'></i> : translation.sendotp}
        </button>

      </form>
    </div>
  );
};

export default ForgetPass;
