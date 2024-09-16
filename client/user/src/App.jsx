import './App.css'
import Home from './pages/home/Home'
import About from './pages/about/About'
import NotFound from './pages/notFound/NotFound'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/layout/Layout'
import ProtectedRoot from './pages/protectedRoot/ProtectedRoot'
import Setting from './pages/setting/Setting'
import Contact from './pages/cotact/Contact'
import Cart from './pages/cart/Cart'
import Food from './components/food/Food'
import FoodCatogery from './components/food-catogery/FoodCatogery'
import Menu from './pages/menu/Menu'

function App() {

  const queryClient = new QueryClient()


  return (
    <>
<QueryClientProvider client={queryClient}>
   <BrowserRouter >
   <Routes>
    <Route path='' element={<Layout ></Layout>}>
    <Route path='' element={<Home></Home>}></Route>
    <Route path='/about' element={ <About></About>}></Route>
    <Route path='/contact' element={ <Contact></Contact>}></Route>
    <Route path='/menu' element={ <Menu></Menu>} >
    <Route path='/menu/:id' element={<FoodCatogery></FoodCatogery>}></Route>
    </Route>
    <Route path='/setting' element={<ProtectedRoot><Setting></Setting></ProtectedRoot>}>
    </Route>
    <Route path="/cart" element={<ProtectedRoot><Cart /></ProtectedRoot>}></Route>     
    <Route path='*' element={<NotFound></NotFound>}></Route>
    </Route>
   </Routes>
   </BrowserRouter>
</QueryClientProvider>
    </>
  );
}

export default App;
