import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const InputsOrder = ({ type, name, yub, register, errors }) => (
  <div className="mb-4">
    <label htmlFor={yub} className="block dark:text-white  text-sm font-medium text-gray-700 mb-1">
      {name}
    </label>
    <input
      type={type}
      id={yub}
      {...register(yub)}
      className={`w-full px-3 py-2 border dark:text-black ${
        errors[yub] ? 'border-red-500' : 'border-gray-300'
      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
    />
    {errors[yub] && (
      <p className="mt-1 text-xs text-red-500">{errors[yub].message}</p>
    )}
  </div>
);

const OrderForm = () => {
  const api = useSelector(state => state.apiLink.link);
  const { user, userInfo } = useSelector((state) => state.auth);
  const { translation } = useSelector(state => state.lang);
const queryClient = useQueryClient()
const navigate = useNavigate();

  const schema = yup.object().shape({
    apartment: yup.string().required(translation.errApartment),
    first_name: yup.string().required(translation.errNameF),
    last_name: yup.string().required(translation.errNameL),
    street: yup.string().required(translation.errStreet),
    building: yup.string().required(translation.errBuliding),
    phone_number: yup.string().matches(/^(010|011|012|015)\d{8}$/, translation.invalidPhone)
      .required(translation.errPhone)
      .min(10, translation.errPhoneMin)
      .max(15, translation.errPhoneMax),
    email: yup.string().email(translation.errEmail).required(translation.errEmailReq),
    floor: yup.string().required(translation.errFloor),
  });

  const fullName = userInfo.name.trim().split(" ");

  const firstName = fullName[0];
  const lastName = fullName.slice(1).join(" ");

  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
          country: "Egypt",
          state: "Red Sea",
          city: "Red Sea",
          phone_number: userInfo?.phone,
          email: userInfo?.email,
          first_name: firstName,
          last_name: lastName,
          payment_method: "online",
      }
  });

  const { mutate: orderCheckOut, error, isSuccess, isLoading } = useMutation(
    'order',
    async ({ billing_data, payment_method }) => {
      const headers = { token: `${user}` };
      const dataToSend = {
        redirection_url: payment_method === 'online' ? "http://localhost:5173" : undefined,
        after_redirect_url:"http://localhost:5173",
        billing_data: billing_data,
        payment_method: payment_method
      };
      // console.log(dataToSend)
      const response = await axios.post(`${api}/paymob`, dataToSend, { headers });
      return response?.data;
    },
    {
        onSuccess: (data, payment_method) => {
            // console.log(payment_method.payment_method
            //     , "from api link somthing what ever");
            if (data.apiLink && payment_method?.payment_method === 'online') {
                window.location.href = data.apiLink;
                toast.success("your order was successfull1")

            } else {
                toast.success("your order was successfull2")
                queryClient.invalidateQueries('cart')
                navigate('/allOrders');
              }
        },
        onError: (error) => {
            console.error("Error during checkout:", error);
        }
    }
  );

  const submitTheForm = (data) => {
    orderCheckOut({ billing_data: data, payment_method: data.payment_method });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitTheForm)} className="bg-transparent   shadow-md rounded-lg p-6  max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-800 ">{translation.orderForm}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputsOrder type="text" name={translation.orderFirsetName} yub="first_name" register={register} errors={errors} />
        <InputsOrder type="text" name={translation.orderLastName} yub="last_name" register={register} errors={errors} />
      </div>

      <InputsOrder type="email" name={translation.email} yub="email" register={register} errors={errors} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputsOrder type="text" name={translation.apartment} yub="apartment" register={register} errors={errors} />
        <InputsOrder type="tel" name={translation.orderPhone} yub="phone_number" register={register} errors={errors} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputsOrder type="text" name={translation.buliding} yub="building" register={register} errors={errors} />
        <InputsOrder type="text" name={translation.street} yub="street" register={register} errors={errors} />
        <InputsOrder type="text" name={translation.floor} yub="floor" register={register} errors={errors} />
      </div>

      <input type="hidden" value="Egypt" {...register('country')} />
      <input type="hidden" value="Red Sea" {...register('state')} />
      <input type="hidden" value="Red Sea" {...register('city')} />

      <div className="mt-6">
        <p className="font-medium mb-2">{translation.paymentMethod}</p>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="online"
              {...register("payment_method")}
              className="form-radio text-red-600"
            />
            <span className="ml-2 p-1 ms-1"> {translation.onlinePayment} </span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="cash"
              {...register("payment_method")}
              className="form-radio text-red-600"
            />
            <span className="ml-2 p-1 ms-1"> {translation.delivery} </span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || isSuccess}
        className="w-full mt-6 p-3 text-center bg-red-900 hover:bg-red-600 text-white rounded-lg font-bold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" /> {translation.orderProcess}
          </div>
        ) : isSuccess ? (
          <div className="flex items-center justify-center">
            <FaCheckCircle className="mr-2" /> {translation.orderSuccess}
          </div>
        ) : (
          translation.orderNow
        )}
      </button>

      {error && <p className="text-red-500 mt-2 text-center">{translation.orderErrorCheck}</p>}
    </form>
  );
}

export default OrderForm;