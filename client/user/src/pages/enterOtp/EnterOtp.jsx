import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import LabelIcon from '../../components/ReactI-cons/label/LabelIcon';
import { HiXCircle } from 'react-icons/hi';
import { List } from 'flowbite-react';
import { Helmet } from 'react-helmet-async';
import CheckIcon from './../../components/ReactI-cons/CheckIcon/CheckIcon';
import LabelIcon from './../../components/ReactI-cons/label/LabelIcon';
import EmailIcon from './../../components/ReactI-cons/EmailIcon/EmailIcon';
import LockIcon from './../../components/ReactI-cons/lockIcon/LockIcon';

const EnterOtp = () => {
    const { translation } = useSelector(state => state.lang)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isloading, setIsLoading] = useState(false)
    const { link } = useSelector(state => state.apiLink)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            otp: '',
            email: '',
            newPassword: '',
        },
        validationSchema: Yup.object({
            otp: Yup.string().required(`${translation.reqOtp} `),

            email: Yup.string()
                .email(`${translation.invalidEmail} `)
                .required(`${translation.reqEmail} `),

            newPassword: Yup.string()
                .min(8, `${translation.minPassword} `)
                .matches(/[a-zA-Z]/, `${translation.containLetters} `)
                .matches(/\d/, `${translation.containNumbers} `)
                .required(`${translation.reqPassword} `),
        }),
        onSubmit: async (values) => {
            setIsLoading(true)
            setErrorMessage("")
            try {
                // eslint-disable-next-line no-unused-vars
                const response = await axios.post(`${link}/reset-password/reset`, values);
                toast.success(translation.resetsuccess, {
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
                <title>OTP</title>
                <meta name="description" content="About Page" />
            </Helmet>
            <form
                onSubmit={formik.handleSubmit}
                className="  p-8 rounded-lg  max-w-md w-full dark:text-white"
            >
                <h2 className="flex items-center justify-center gap-2 text-2xl font-bold mb-6 text-center">
                    <CheckIcon />
                    {translation.confirmOtptoReset}
                </h2>
                <div className="mb-4">
                    <label htmlFor="otp" className="flex items-center gap-1 text-gray-700 dark:text-white ">
                        <LabelIcon />
                        {translation.enterotp}
                    </label>
                    <input
                        id="otp"
                        name="otp"
                        type="text"
                        className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200  ${formik.touched.otp && formik.errors.otp
                            ? 'border-red-500'
                            : ''
                            }`}
                        {...formik.getFieldProps('otp')}
                    />
                    {formik.touched.otp && formik.errors.otp ? (
                        <List   >
                            <List.Item className='text-red-600 flex  text-sm   dark:text-red-500 capitalize mb-2' icon={HiXCircle}>{formik.errors.otp}</List.Item>
                        </List>
                    ) : null}
                    <Link to={"/forgot-password/resetpass"} className="text-blue-500 hover:text-blue-700">
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
                <div className="mb-4">
                    <label htmlFor="newPassword" className="flex items-center gap-1 text-gray-700 dark:text-white">
                        <LockIcon />
                        {translation.newPass}
                    </label>
                    <div className='relative'>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type={showPassword ? "text" : "password"}
                            className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200  ${formik.touched.newPassword && formik.errors.newPassword
                                ? 'border-red-500'
                                : ''
                                }`}
                            {...formik.getFieldProps('newPassword')}
                        />
                        <div className="absolute top-0 right-0 p-2">
                            <button type='button' className="m-0 p-0">
                                <i onClick={handleShowPassword} className="fas text-dark fa-eye"></i>
                            </button>
                        </div>
                    </div>
                    {formik.touched.newPassword && formik.errors.newPassword ? (
                        <List   >
                            <List.Item className='text-red-600 flex  text-sm   dark:text-red-500 capitalize mb-2' icon={HiXCircle}>{formik.errors.newPassword}</List.Item>
                        </List>
                    ) : null}
                </div>
                {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
                <button
                    type="submit"
                    disabled={isloading}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700"
                >
                    {isloading ? <i className='fas fa-spin fa-spinner'></i> : translation.resetpass}
                </button>
            </form>
        </div>
    );
};

export default EnterOtp;
