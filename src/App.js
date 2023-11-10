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
import AdminCategory from './Admin/pages/AdminCategory';
import AdminViewProduct from './Admin/pages/AdminViewProduct';


import Layout from './components/Layout';
import Product from './Users/Product';
import ProductDetails from './Users/ProductDetails';
import Login from './Users/Login';
import Register from './Users/Register';
import Cart from './Users/Cart';
import { User } from './Admin/pages/User';
import UserDetails from './Admin/pages/UserDetails';

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


                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/register' element={<Register/>}></Route>


                </Route>


                {/* Admin route */}
                    <Route path='/admin' element={<AdminLayout/>}>
                              <Route path='/admin' element={<AdminLogin/>}></Route>
                              <Route path='/admin/register' element={<AdminRegister/>}></Route>
                              <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
                              <Route path='/admin/category' element={<AdminCategory/>}></Route>
                              <Route path='/admin/product' element={<AdminProduct/>}></Route>
                              <Route path='/admin/viewproduct' element={<AdminViewProduct/>}></Route>
                              <Route path='/admin/user' element={<User/>}></Route>
                              <Route path='/admin/userdetail/:userid' element={<UserDetails/>}></Route>
                    </Route>
                        

                

            </Routes>
           
       </BrowserRouter>
  );
}

export default App;
