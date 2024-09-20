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
        <h1 style={{"fontFamily":" Caveat"}}  className="text-5xl font-extrabold    mb-8 text-center">
        <i class="fa-solid fa-layer-group pe-3"></i>
            {translation.categories}</h1>
        <div className="grid grid-cols-12">
        {categories.map((category, index) => {
            return <Category key={index} category={category} />; 
        })}
        </div>
    </div>}
    
    </>
  )
}
