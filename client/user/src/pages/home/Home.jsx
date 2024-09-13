
import { useSelector } from "react-redux";



export default function Home() {
  const { translation } = useSelector(state => state.lang)
  console.log(translation);
  

  return (
    <>
  <p>home</p>
    </>
  )
}
