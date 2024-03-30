import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import AddToCart from '../pages/AddToCart'
import ProductDetails from '../pages/ProductDetails'
import Error404 from '../pages/Error404'

export const NavigationStack = () => {
  return (
   <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<AddToCart/>} />
        <Route path='*' element={<Error404/>}/> 

        //Dynamic Routing
        <Route path='/productDetail/:id' element={<ProductDetails/>}/>
    </Routes>
   </BrowserRouter>
  )
}
