import React from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route index path='/' element={<Home />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
