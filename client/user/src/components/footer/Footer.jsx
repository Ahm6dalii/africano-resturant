import logo from "../../assets/affricanoImg/logo_afr-removebg-preview.png"
import logoLight from "../../assets/logo/logo.li.png";
import { useSelector } from 'react-redux'
export default function Footer() {
  const { mode } = useSelector((state) => state.mode);
  const {translation}=useSelector(state=>state.lang)

  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-300 py-10">
    <div className="container mx-auto px-6 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        {/* Restaurant Name */}
        <div className="text-center md:text-lef">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{translation.heroAfricano}</h2>
          {mode=="dark"?
            <img src={logo} className="w-[80px]  " alt="Flowbite React Logo" />
            :<img src={logoLight} className="w-[80px]  " alt="Flowbite React Logo" />
            }          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {translation.footerDesc}
          </p>
        </div>
        {/* Contact Info */}
        <div className="text-center">
          <h3 className="text-xl font-semibold">{translation.footerPhone}</h3>
          <p className="mt-2">{translation.Phone} <a href="tel:+123456789" className="text-blue-600 dark:text-blue-400">+201020142743</a></p>
        </div>
        {/* Social Media */}
        <div className="text-center">
          <h3 className="text-xl font-semibold">{translation.FollowUs}</h3>
          <div className="mt-2 flex justify-center space-x-6" dir="ltr">
            <a href="https://www.facebook.com/profile.php?id=100090617247433" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="https://www.instagram.com/africanopizzapasta?igsh=MTB5MnFwcXJ1Z2Y0eA==" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">{translation.copyright}</p>
      </div>
    </div>
  </footer>
  )
}
