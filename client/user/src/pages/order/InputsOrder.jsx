/* eslint-disable react/prop-types */

const InputsOrder = ({ type, name, register, yub, errors }) => {
    return (
        <>
            <div className="relative ">
                <input
                    type="text"
                    id={type}
                    className={`dark:bg-[#1c1c1c] block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg dark:border-[3px] 
                ${errors[yub] ? 'border-red-600' : 'border-[#696969]'} 
                appearance-none dark:text-black   dark:focus:border-green-500 focus:outline-none focus:ring-0 
                focus:border-green-600 peer`}
                    placeholder=""
                    {...register(yub)}
                />
                <label
                    htmlFor={type}
                    className={`bg-transparent absolute text-md ${errors[yub] ? 'text-red-600' : 'text-green-600'} 
                dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
                bg-[#222222] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 start-1 font-semibold md:h-10 h-16 `}
                >
                    {name}
                </label>
                <div className="">
                    {errors[yub] && <p className="mt-2 text-md text-red-600 dark:text-red-400">{errors[yub].message}</p>}
                </div>
            </div>
        </>
    )
}

export default InputsOrder;
