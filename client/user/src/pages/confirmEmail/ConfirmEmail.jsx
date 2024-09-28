import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import LabelIcon from '../../components/ReactI-cons/label/LabelIcon';
import EmailIcon from '../../components/ReactI-cons/EmailIcon/EmailIcon';
import CheckIcon from '../../components/ReactI-cons/CheckIcon/CheckIcon';
import { List } from 'flowbite-react';
import { HiXCircle } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';

const ConfirmEmail = () => {
    const { translation } = useSelector(state => state.lang)
    const [errorMessage, setErrorMessage] = useState('')
    const [isloading, setIsLoading] = useState(false)
    const { link } = useSelector(state => state.apiLink)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            OTBCode: '',
            email: '',
        },
        validationSchema: Yup.object({
            OTBCode: Yup.string().required(`${translation.reqOtp} `),

            email: Yup.string()
                .email(`${translation.invalidEmail} `)
                .required(`${translation.reqEmail} `),
        }),
        onSubmit: async (values) => {
            setIsLoading(true)
            setErrorMessage("")
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await axios.post(`${link}/confirm`, values);
                toast.success(translation.confirmsuccess, {
                    duration: 4000,
                    position: 'top-right',
                })
                setIsLoading(false)
                navigate("/login")

            } catch (error) {
                setErrorMessage(error.response?.data?.message)
                setIsLoading(false)
            }
        },
    });


    return (
        <div className="flex justify-center items-center pt-6">
            <Helmet>
                <title>Confirm Email</title>
                <meta name="description" content="About Page" />
            </Helmet>
            <form
                onSubmit={formik.handleSubmit}
                className=" p-8 rounded-lg  max-w-md w-full dark:text-black"
            >
                <h2 className="text-4xl font-bold mb-6 text-center flex items-center gap-3 justify-center text-red-900 dark:text-orange-200">
                    <CheckIcon></CheckIcon>
                    {translation.confirmAcount}
                </h2>
                <div className="mb-4">
                    <label htmlFor="otp" className="flex items-center gap-1 text-gray-700 dark:text-white ">
                        <LabelIcon />
                        {translation.enterotp}
                    </label>
                    <input
                        id="otp"
                        name="OTBCode"
                        type="text"
                        className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200  ${formik.touched.otp && formik.errors.otp
                            ? 'border-red-500'
                            : ''
                            }`}
                        {...formik.getFieldProps('OTBCode')}
                    />
                    {formik.touched.OTBCode && formik.errors.OTBCode ? (
                        <List   >
                            <List.Item className='text-red-600 flex  text-sm   dark:text-red-500 capitalize mb-2' icon={HiXCircle}>{formik.errors.OTBCode}</List.Item>
                        </List>
                    ) : null}
                    <Link to={"/forgot-password/confirm"} className="text-blue-500 hover:text-blue-700">
                        {translation.resendotp}
                    </Link>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="flex items-center gap-1 text-gray-700 dark:text-white ">
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
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                <button
                    type="submit"
                    disabled={isloading}
                    className=" w-full bg-red-900 hover:bg-red-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white py-2 px-4 rounded-full "
                >
                    {isloading ? <i className='fas fa-spin fa-spinner'></i> : translation.confirmacount}
                </button>
            </form>
        </div>
    );
};

export default ConfirmEmail;
