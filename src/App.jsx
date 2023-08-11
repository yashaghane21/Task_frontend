import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Components/Home"
import Nav from './Components/Nav'
import Details from './Components/Details'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Profile from './Components/Profie'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Authprovider } from './Components/auth'
import Layout from './Components/Layout'
import Cart from './Components/Cart'
import Uprofile from './Components/Uprofile'
const App = () => {
  return (
    <div>
      <Authprovider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Layout />} />
            <Route exact path='/details/:id' element={<Details />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/uprofile' element={<Uprofile />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>

      </Authprovider>

    </div>
  )
}

export default App
