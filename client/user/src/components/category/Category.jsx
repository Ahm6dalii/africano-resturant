/* eslint-disable react/prop-types */
import { Card } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function Category({category}) {
    const {language}=useSelector(state=>state.lang)
    const {mode}=useSelector(state=>state.mode)
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 mt-3 mx-3">
        <Link to={`/menu/${category._id}`}>
    <Card className={`max-w-sm m-auto ${mode=='light'?'bg-catBackLight':'bg-catBack'} bg-no-repeat bg-center bg-cover p-24 `}>
    <h5 className="text-2xl text-center font-bold tracking-tight ">
        {language =="en"? category?.name?.en : category?.name?.ar}
    </h5>
    <p className="font-normal text-center ">
    {language =="en"? category?.description?.en : category?.description?.ar}
    </p>
  </Card>
        </Link>
    </div>
  )
}
