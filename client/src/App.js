import React, { useState, useEffect } from 'react'
import './App.css'
import { Switch } from 'react-router-dom'
import Navbar from './features/navbar/Navbar'
import { useRefreshTokensPolling } from './hooks'

import { checkAccessTokenTime, isRefreshTokenValid } from './utils'
import AuthRoute from './components/authroute/AuthRoute'
import Login from './features/auth/Login'
import Register from './features/auth/Register'

function App() {
  useRefreshTokensPolling()

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <AuthRoute type="guest" exact path="/register">
          <Register />
        </AuthRoute>
        <AuthRoute type="guest" exact path="/login">
          <Login />
        </AuthRoute>
        <AuthRoute type="pruvate" exact path="/user"></AuthRoute>
      </Switch>
    </div>
  )
}

export default App
