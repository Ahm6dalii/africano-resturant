import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const EnterOtp = () => {
    const { translation } = useSelector(state => state.lang)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isloading, setIsLoading] = useState(false)

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
                const response = await axios.post('http://localhost:3000/reset-password/reset', values);
                toast.success(translation.resetsuccess, {
                    duration: 4000,
                    position: 'top-right',
                })
                setTimeout(() => {
                    setIsLoading(false)
                    navigate("/login")
                }, 1500);
            } catch (error) {
                setErrorMessage(error.response?.data?.message)
                setIsLoading(false)
            }
        },
    });

    return (
        <div className="flex justify-center items-center pt-6">
            <Toaster />
            <form
                onSubmit={formik.handleSubmit}
                className="border-solid border-2 p-8 rounded-lg shadow-2xl max-w-md w-full dark:text-white"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">{translation.confirmOtptoReset}</h2>
                <div className="mb-4">
                    <label htmlFor="otp" className="block text-gray-700 dark:text-white ">
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
                        <div className="text-red-500 text-sm mt-1">{formik.errors.otp}</div>
                    ) : null}
                    <Link to={"/forgot-password/resetpass"} className="text-blue-500 hover:text-blue-700">
                        {translation.resendotp}
                    </Link>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 dark:text-white ">
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
                        <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-gray-700 dark:text-white">
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
                        <div className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</div>
                    ) : null}
                </div>
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700"
                >
                    {isloading ? <i className='fas fa-spin fa-spinner'></i> : translation.resetpass}
                </button>
            </form>
        </div>
    );
};

export default EnterOtp;
