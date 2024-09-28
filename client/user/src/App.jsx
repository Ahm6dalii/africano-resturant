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

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Food from "./components/food/Food";
import FoodCatogery from "./components/food-catogery/FoodCatogery";
import Menu from "./pages/menu/Menu";
import Categories from "./pages/categories/Categories";

import OrderList from "./pages/orderList/OrderList";
import ForgetPass from "./pages/forgetPass/ForgetPass";
import EnterOtp from "./pages/enterOtp/EnterOtp";
import ConfirmEmail from "./pages/confirmEmail/ConfirmEmail";
import Cart from "./pages/cart/Cart";
import FoodDetails from "./pages/FoodDetails/FoodDetails";
import Order from "./pages/order/Order";
import UpdateUserInfo from './pages/setting/updateUserInfo/UpdateUserInfo';
import UpdatePassword from "./pages/setting/updatePassword/UpdatePassword";
import ProfileImage from "./pages/setting/changeProfileImage/ChnageProfileImage";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Layout></Layout>}>
              <Route path="" element={<Home></Home>}></Route>
              <Route path="/about" element={<About></About>}></Route>
              <Route path="/login/*" element={<Login></Login>}></Route>
              <Route path="/register" element={<Register></Register>}></Route>

              <Route path="/contact" element={<Contact></Contact>}></Route>
              <Route
                path="/categories"
                element={<Categories></Categories>}
              ></Route>
              <Route path="/menu" element={<Menu></Menu>}>
                <Route
                  path="/menu/:id"
                  element={<FoodCatogery></FoodCatogery>}
                ></Route>
              </Route>
              <Route
                path="/setting"
                element={
                  <ProtectedRoot>
                    <Setting></Setting>
                  </ProtectedRoot>
                }
              >
                <Route
                  path="/setting"
                  element={
                    <ProtectedRoot>
                      <UpdateUserInfo></UpdateUserInfo>
                    </ProtectedRoot>
                  }
                >
                  {" "}
                </Route>
                <Route
                  path="/setting/update-password"
                  element={
                    <ProtectedRoot>
                      <UpdatePassword></UpdatePassword>
                    </ProtectedRoot>
                  }
                >
                  {" "}
                </Route>
                <Route
                  path="/setting/img-profile"
                  element={
                    <ProtectedRoot>
                      <ProfileImage></ProfileImage>
                    </ProtectedRoot>
                  }
                >
                  {" "}
                </Route>
              </Route>
              <Route
                path="/forgot-password/:path"
                element={<ForgetPass></ForgetPass>}
              ></Route>
              <Route path="/resetPass" element={<EnterOtp></EnterOtp>}></Route>
              <Route
                path="/confirm"
                element={<ConfirmEmail></ConfirmEmail>}
              ></Route>
              <Route path="/contact" element={<Contact></Contact>}></Route>
              <Route
                path="/food/:id"
                element={<FoodDetails></FoodDetails>}
              ></Route>
              <Route path="/order" element={<ProtectedRoot><Order></Order></ProtectedRoot>}></Route>
              <Route path="/cart" element={<ProtectedRoot><Cart /></ProtectedRoot>}></Route>
              <Route path="/forgot-password" element={<ForgetPass />}></Route>
              <Route path="/OTP" element={<EnterOtp />}></Route>
              <Route path="/allOrder/*" element={<OrderList />}></Route>
              <Route path="*" element={<NotFound></NotFound>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
