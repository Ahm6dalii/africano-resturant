import axios from "axios";
import { useEffect, useState } from "react";
import Category from "../../components/category/Category";
import { useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
export default function Categories() {
    const [categories,setCategories]=useState([])
    const {translation}=useSelector(state=>state.lang)
    const [isLoading,setIsLoading] = useState(true)
    const {link } = useSelector(state => state.apiLink)

    const getAllCategories=async()=>{
        setIsLoading(true)
        try {
            const {data} =await axios.get(`${link}/api/categories`)
            console.log(data);
            setCategories(data)
        } catch (error) {
            console.log(error);
            
        }
        setIsLoading(false)
    }

    useEffect(()=>{
        getAllCategories()
    },[])
  return (
    <>
    {isLoading?<Loading/>:<div className="">
        <h1 className="text-3xl  text-center font-bold py-7 tracking-tight text-gray-900 dark:text-white">{translation.categories}</h1>
        <div className="grid grid-cols-12">
        {categories.map((category, index) => {
            return <Category key={index} category={category} />; 
        })}
        </div>
    </div>}
    
    </>
  )
}
