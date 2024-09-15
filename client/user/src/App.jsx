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
import Login from './pages/login/Login';
import Register from './pages/register/Register'

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
    <Route path='/login' element={ <Login></Login>}></Route>
    <Route path='/register' element={ <Register></Register>}></Route>

    <Route path='/contact' element={ <Contact></Contact>}></Route>
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
