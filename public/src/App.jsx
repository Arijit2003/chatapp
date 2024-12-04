import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import SetAvatar from './pages/SetAvatar'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/setAvatar' element={<SetAvatar/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
