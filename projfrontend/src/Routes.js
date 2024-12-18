 /*import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./core/Home"
 const Routes = () => {
    return (
        <BrowserRouter>
          <Switch>
                <Route path = "/" exact component = {Home}/>          
          </Switch> 
        </BrowserRouter>
    )
 }
 export default Routes;*/
/*
 import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes"
import UserDashBoard from "./user/UserDashBoard"
import AdminDashboard from "./user/AdminDashBoard"



const MyRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
      <Route path="/" element ={<Home/>} />
      <Route path="/signup" element ={<Signup/>} />
      <Route path="/signin" element ={<Signin/>} />
      <PrivateRoute  path="/user/dashboard" element ={<UserDashBoard/>}/>
      <AdminRoute  path="/admin/dashboard" element ={<AdminDashboard/>}/>



        </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;*/

/*

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from "./auth/helper/AdminRoutes"; // Ensure AdminRoute is also updated similarly to PrivateRoute
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <PrivateRoute path="/user/dashboard" element={<UserDashBoard />} />
        <AdminRoute path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
*/

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from "./auth/helper/AdminRoutes"; // Make sure to update this too
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';


const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route 
          path="/user/dashboard" 
          element={<PrivateRoute element={<UserDashBoard />} />} 
        />
        <Route 
          path="/admin/dashboard" 
          element={<AdminRoute element={<AdminDashboard />} />} 
        />
        <Route 
          path="/admin/create/category" 
          element={<AdminRoute element={<AddCategory />} />} 
        />
        <Route 
          path="/admin/categories" 
          element={<AdminRoute element={<ManageCategories />} />} 
        />
        <Route 
          path="/admin/create/product" 
          element={<AdminRoute element={<AddProduct />} />} 
        />
         <Route 
          path="/admin/products" 
          element={<AdminRoute element={<ManageProducts />} />} 
        />
        <Route 
          path="/admin/product/update/:productId" 
          element={<AdminRoute element={<UpdateProduct />} />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
