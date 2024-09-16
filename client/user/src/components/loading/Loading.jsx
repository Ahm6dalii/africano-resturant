import { GridLoader } from 'react-spinners'
import bgImage from '../../assets/affricanoImg/logo_afr-removebg-preview.png'; // Import the image
export default function Loading() {
  return (
    <>
      
    <div className='flex items-center justify-center h-[70vh] flex-col'>
    <img src={bgImage} alt="Background" className='w-28'/>
    <GridLoader color='#ea3c20' />      
    </div>
    </>
  )
}
