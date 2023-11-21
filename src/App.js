import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Users/Home';

import AdminLogin from './Admin/pages/AdminLogin';
import AdminRegister from './Admin/pages/AdminRegister';
import AdminLayout from './Admin/component/AdminLayout';
import AdminDashboard from './Admin/pages/AdminDashboard';
import AdminProduct from './Admin/pages/AdminProduct';
import AdminCategory from './Admin/pages/Category/AdminCategory';
import AdminViewProduct from './Admin/pages/AdminViewProduct';
import AdminAddCategory from './Admin/pages/Category/AdminAddCategory';
import AdminEditCategory from './Admin/pages/Category/AdminEditCategory';
import Slider from './Admin/pages/Slider/AdminSlider';
import AdminAddSlider from './Admin/pages/Slider/AdminAddSlider';
import AdminEditSlider from './Admin/pages/Slider/AdminEditSlider';


import Layout from './components/Layout';
import Product from './Users/Product';
import ProductDetails from './Users/ProductDetails';
import Login from './Users/Login';
import Register from './Users/Register';
import Cart from './Users/Cart';
import { User } from './Admin/pages/User';
import UserDetails from './Admin/pages/UserDetails';
import Dashboard from './Users/Dashboard';
import DashboardCart from './Users/DashboardCart';
import DashboardOrder from './Users/DashboardOrder';
import DashboardProfile from './Users/DashboardProfile';


function App() {
  return (
       <BrowserRouter>
            <Routes>
               {/* user route */}
                <Route  element={<Layout/>}>
                    <Route path='/' index element={<Home/>}></Route>
                    <Route path='/product' element={<Product/>}></Route>
                    <Route path='/product_details/:productId' element={<ProductDetails/>}></Route>
                    <Route path='/cart' element={<Cart/>}></Route>


                    <Route path='/dashboard' element={<Dashboard/>}></Route>
                    <Route path='/dashboard-cart' element={<DashboardCart/>}></Route>
                    <Route path='/dashboard-order' element={<DashboardOrder/>}></Route>
                    <Route path='/dashboard-profile' element={<DashboardProfile/>}></Route>




                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/register' element={<Register/>}></Route>

                    {/* Admin route */}
                    <Route path='/admin/user' element={<User/>}></Route>
                    <Route path='/admin/category' element={<AdminCategory/>}></Route>
                    <Route path='/admin/addcategory' element={<AdminAddCategory/>}></Route>
                    <Route path='/admin/editcategory/:id' element={<AdminEditCategory/>}></Route>
                    <Route path='/admin/slider' element={<Slider/>}></Route>
                    <Route path='/admin/addslider' element={<AdminAddSlider/>}></Route>
                    <Route path='/admin/editslider/:id' element={<AdminEditSlider/>}></Route>


                    

                    




                </Route>


                {/* Admin route */}
                    {/* <Route path='/admin' element={<AdminLayout/>}> */}
                              <Route path='/admin' element={<AdminLogin/>}></Route>
                              <Route path='/admin/register' element={<AdminRegister/>}></Route>
                              <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
                              
                              <Route path='/admin/product' element={<AdminProduct/>}></Route>
                              <Route path='/admin/viewproduct' element={<AdminViewProduct/>}></Route>
                              
                              <Route path='/admin/userdetail/:userid' element={<UserDetails/>}></Route>
                    {/* </Route> */}
                        

                

            </Routes>
           
       </BrowserRouter>
  );
}

export default App;
