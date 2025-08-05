  import React from 'react'
  import {Routes,Route, useLocation} from 'react-router-dom'
  import Home from './pages/Home'
  import Navbar from './components/Navbar'
  import Login from './components/Login'
  import { Toaster } from "react-hot-toast";
  import { useAppContext } from './context/AppContext';
  import Footer from './components/Footer'
  import Shop from './pages/Shop'
  import ProductCategory from './pages/ProductCategory'
  import ProductDetails from './pages/ProductDetails'
  import Cart from './pages/Cart'
  import AddAddress from './pages/AddAddress'
  import MyOrders from './pages/MyOrders'
  import SellerLogin from './components/seller/SellerLogin'
  import SellerLayout from './pages/seller/SellerLayout'
  import AddProduct from './pages/seller/AddProduct'
  import ProductList from './pages/seller/ProductList'
  import Orders from './pages/seller/Orders'
  import Success from './components/Success'
  import Failure from './components/Failure'
  import Contact from './pages/Contact'
  import UpdateProduct from './pages/seller/UpdateProduct'

  const App = () => {

    const isSellerPath = useLocation().pathname.includes("seller");
    const {showUserLogin, isSeller} = useAppContext()
    return (
      <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null :<Navbar/> }   
      {showUserLogin ? <Login/> : null}
      <Toaster/>

        <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/shop/:category' element={<ProductCategory/>}/>
          <Route path='/shop/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>
          <Route path="/contact" element={<Contact />} />
          <Route path='/payment-success' element={<Success />} />
          <Route path='/payment-failure' element={<Failure/>}/>

          <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
            <Route index element={isSeller ? <AddProduct/> : null}/>
            <Route path='product-list' element={<ProductList/>}/>
            <Route path='orders' element={<Orders/>}/>
            <Route path="update-product/:id" element={<UpdateProduct />} />

          </Route>
        </Routes>
        </div>
        {!isSellerPath && <Footer/>}
      </div>
    )
  }

  export default App
