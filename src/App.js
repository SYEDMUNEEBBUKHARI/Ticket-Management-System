import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import './App.scss'
import '../node_modules/antd/dist/reset.css'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
