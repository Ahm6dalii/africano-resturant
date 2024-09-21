import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import InputsOrder from "./InputsOrder";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import toast from 'react-hot-toast';
const OrderForm = () => {
    const api = useSelector(state => state.apiLink.link);

    const { user, userInfo } = useSelector((state) => state.auth);
    const { translation } = useSelector(state => state.lang)
    const { mutate: orderCheckOut, error, isSuccess, isLoading } = useMutation('order', async (billing_data) => {
        const headers = {
            token: `${user}`,
        }
        const dataToSend = {
            redirection_url: "http://localhost:5173/userOrders",
            billing_data: billing_data
        }
        const response = await axios.post(`${api}/paymob`, dataToSend, { headers })
        console.log(response, "response");
        return response?.data
    }, {
        onSuccess: (data) => {
            if (data?.apiLink) {
                window.location.href = data.apiLink;
            } else {
                console.error("apiLink not found in the response");
            }
        },
        onError: (error) => {
            console.error("Error during checkout:", error);
        }
    })

    const schema = yup.object().shape({
        apartment: yup.string().required(translation.errApartment),
        first_name: yup.string().required(translation.errNameF),
        last_name: yup.string().required(translation.errNameL),
        street: yup.string().required(translation.errStreet),
        building: yup.string().required(translation.errBuliding),
        phone_number: yup.string().matches(/^(010|011|012|015)\d{8}$/, `${translation.invalidPhone}`)
            .required(translation.errPhone)
            .min(10,translation.errPhoneMin )
            .max(15, translation.errPhoneMax),
        email: yup.string(translation.errEmail).email().required(translation.errEmailReq),
        floor: yup.string().required(translation.errFloor),
    });

    const { register, handleSubmit, formState: { errors }, reset, setValue, getValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            country: "Egypt",
            state: "Red Sea",
            city: "Red Sea",
            phone_number: userInfo?.phone,
            email: userInfo?.email,
            first_name: userInfo?.name
        }
    });
    setValue("country", "Egypt");
    setValue("state", "Red Sea");
    setValue("city", "Red Sea");
    const submitTheForm = (data) => {
        console.log(data);
        orderCheckOut(data)
    };

    return (
        <>
            <form onSubmit={handleSubmit(submitTheForm)} className="p-4 md:p-6 lg:p-8">
                <div className="grid gap-6 my-6 pt-10">
                    <div className="grid items-start gap-6 grid-cols-2 w-full md:w-full ">
                        <InputsOrder type="first_name" name={translation.orderFirsetName} yub="first_name" register={register} errors={errors} />
                        <InputsOrder type="last_name" name={translation.orderLastName} yub="last_name" register={register} errors={errors} />
                    </div>

                    <InputsOrder type="email" name={translation.email} yub="email" register={register} errors={errors} />


                    <div className="grid items-start gap-6 grid-cols-2">
                        <InputsOrder type="apartment" name={translation.apartment}yub="apartment" register={register} errors={errors} />
                        <InputsOrder type="phone_number" name={translation.orderPhone} yub="phone_number" register={register} errors={errors} />
                    </div>


                    <div className="grid items-start gap-6 md:grid-cols-3">
                        <InputsOrder type="building" name={translation.buliding} yub="building" register={register} errors={errors} />
                        <InputsOrder type="street" name={translation.street} yub="street" register={register} errors={errors} />
                        <InputsOrder type="floor" name={translation.floor} yub="floor" register={register} errors={errors} />
                    </div>



                    <input type="hidden" value="Egypt" {...register('country')} />
                    <input type="hidden" value="Red Sea" {...register('state')} />
                    <input type="hidden" value="Red Sea" {...register('city')} />

                </div>

                <button disabled={isLoading || isSuccess} className="w-full bg-[#c83f46] p-4 text-center text-white rounded-lg font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br">
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
                {error && <p className="text-red-500 mt-2">{translation.orderErrorCheck}</p>}
            </form>

        </>
    );
}

export default OrderForm;
