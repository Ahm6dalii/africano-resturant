import "./App.css";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import NotFound from "./pages/notFound/NotFound";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import ProtectedRoot from "./pages/protectedRoot/ProtectedRoot";
import Setting from "./pages/setting/Setting";
import Contact from "./pages/cotact/Contact";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Food from "./components/food/Food";
import FoodCatogery from "./components/food-catogery/FoodCatogery";
import Menu from "./pages/menu/Menu";
import Categories from "./pages/categories/Categories";
import UpdateUserInfo from "./pages/updateUserInfo/UpdateUserInfo";
import UpdatePassword from "./pages/updatePassword/UpdatePassword";
import ProfileImage from './pages/changeProfileImage/ChnageProfileImage';
import OrderList from './pages/orderList/OrderList';
import ForgetPass from './pages/forgetPass/ForgetPass'
import EnterOtp from './pages/enterOtp/EnterOtp'
import ConfirmEmail from './pages/confirmEmail/ConfirmEmail'

function App() {
  const queryClient = new QueryClient();

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
    <Route path='/forgot-password/:path' element={ <ForgetPass></ForgetPass>}></Route>
    <Route path='/resetPass' element={ <EnterOtp></EnterOtp>}></Route>
    <Route path='/confirm' element={ <ConfirmEmail></ConfirmEmail>}></Route>
    <Route path="/contact" element={<Contact></Contact>}></Route>
     <Route path="/updateinfo" element={<UpdateUserInfo />}></Route>
     <Route path="/updatepass" element={<UpdatePassword />}></Route>
    Route path="/changeimg" element={<ProfileImage />}></Route>
    <Route path="/order" element={<OrderList />}></Route>
    <Route path="/cart" element={ <ProtectedRoot> <Cart /> </ProtectedRoot> } ></Route>
     <Route path="*" element={<NotFound></NotFound>}></Route>
       </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
