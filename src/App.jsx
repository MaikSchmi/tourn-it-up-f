import { useState } from 'react'
import './App.css'
import { Route , Routes } from 'react-router'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import LandingPage from './pages/LandingPage'

function App() {


  return (
    <div className="App">
    
     <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
     </Routes>
    </div>
  )
}

export default App
