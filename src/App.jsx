import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Shop from "./components/shop";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/admin/login";
import Dashboard from "./components/admin/Dashboard";
import { AdminRequireAuth } from "./components/admin/AdminRequireAuth";

import {default as ShowCategories} from './components/admin/category/Show';
import {default as CreateCategory} from "./components/admin/category/Create";
import {default as EditCategory} from "./components/admin/category/Edit";

import {default as ShowBrands} from './components/admin/brand/Show';
import {default as CreateBrands} from "./components/admin/brand/Create";
import {default as EditBrands} from "./components/admin/brand/Edit";

import {default as ShowProducts} from './components/admin/product/Show';
import {default as CreateProduct} from "./components/admin/product/Create";
import {default as EditProduct} from "./components/admin/product/Edit";
import Register from "./components/Register";
import {default as UserLogin} from "./components/Login";
import { RequireAuth } from "./components/RequireAuth";
import Profile from "./components/Profile";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} /> 

          <Route path="/account/register" element={<Register />} />
          <Route path="/account/login" element={<UserLogin />} />
          
          <Route path="/account" element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          /> 

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />

          <Route path="/admin/Dashboard" element={
              <AdminRequireAuth>
                <Dashboard />
              </AdminRequireAuth>
            }
          />

         {/* Category Routes */}
          <Route path="/admin/categories" element={
              <AdminRequireAuth>
                <ShowCategories/>
              </AdminRequireAuth>
            }
          />

          <Route path="/admin/categories/create" element={
              <AdminRequireAuth>
                <CreateCategory/>
              </AdminRequireAuth>
            }
          />

          <Route path="/admin/categories/edit/:id" element={
              <AdminRequireAuth>
                <EditCategory/>
              </AdminRequireAuth>
            }
          />

          {/* Brands Routes */}
          <Route path="/admin/brands" element={
              <AdminRequireAuth>
                <ShowBrands/>
              </AdminRequireAuth>
            }
          />

          <Route path="/admin/brands/create" element={
              <AdminRequireAuth>
                <CreateBrands/>
              </AdminRequireAuth>
            }
          />

          <Route path="/admin/brands/edit/:id" element={
              <AdminRequireAuth>
                <EditBrands/>
              </AdminRequireAuth>
            }
          />

          {/* Products Routes */}
          <Route path="/admin/products" element={
              <AdminRequireAuth>
                <ShowProducts/>
              </AdminRequireAuth>
            }
          />

          <Route path="/admin/products/create" element={
              <AdminRequireAuth>
                <CreateProduct/>
              </AdminRequireAuth>
            }
          />

          <Route path="/admin/products/edit/:id" element={
              <AdminRequireAuth>
                <EditProduct/>
              </AdminRequireAuth>
            }
          />

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
