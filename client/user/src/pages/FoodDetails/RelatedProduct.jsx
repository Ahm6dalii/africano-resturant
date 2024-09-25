
import { useSelector } from 'react-redux';
const RelatedProduct = () => {
    const {translation}=useSelector(state=>state.lang)
    return (
        <div className=" px-28 ">
            <h5 style={{"fontFamily":" Caveat"}} className="text-center text-6xl text-red-900 dark:text-red-500">
                {translation.relatedProducts}
                </h5>
            <div>
                <div className="max-w-xs bg-white rounded-xl shadow-md overflow-hidden m-4 group p-3 ">
                    <div className="rounded-xl p-4 relative h-48 w-full overflow-hidden bg-gray-100 scale-x-50 hover:-scale-y-100 group-hover:bg-yellow-400 transition-all duration-500 ease-in-out">
                        <img src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/19-1.png" alt="" />
                    </div>
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800">Plain Tea</h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Iced coffee is a type of coffee beverage served chilled...
                        </p>

                        <div className="flex items-center mt-3">
                            <span className="text-yellow-400">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                            </span>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <span className="text-xl font-bold text-gray-800">EGP 18.31</span>
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full shadow">
                                <i className="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RelatedProduct