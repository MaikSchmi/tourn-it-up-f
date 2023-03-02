import { useState } from 'react'
import './App.css'
import { Route , Routes } from 'react-router'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import LandingPage from './pages/LandingPage'
import IsPrivate from './components/AuthComponents/IsPrivate'
import IsPublic from './components/AuthComponents/IsPublic'

function App() {


  return (
    <div className="App">

     <Routes>
      <Route path="/" element={  <IsPublic> <LandingPage/> </IsPublic>} />
      <Route path="/home" element={ <IsPrivate> <Home /> </IsPrivate>} />
      <Route path="/signup" element={  <IsPublic> <Signup /> </IsPublic>} />
      <Route path="/login" element={<IsPublic> <Login /> </IsPublic>} />
      <Route path="/profile" element={ <IsPrivate> <Profile /> </IsPrivate>} />
     </Routes>
    </div>
  )
}

export default App
