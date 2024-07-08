import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/PlaceOrder/Placeorder'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import { Toaster } from 'react-hot-toast'
const App = () => {
  const [showLogin,setShowlogin]=useState(false)
  return (
  <>
  {showLogin?<Login setShowlogin={setShowlogin}/>:<></>}
    <div className='app'>
      <Navbar setShowlogin={setShowlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Placeorder/>}/>
      </Routes>
      
    </div>
  <Footer/>
  <Toaster/>
  </>
  )
}

export default App