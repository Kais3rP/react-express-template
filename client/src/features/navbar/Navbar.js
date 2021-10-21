import React from 'react'
import { Link } from 'react-router-dom'
import { useCheckAuthQuery, useLogoutMutation } from '../../services'

const Navbar = () => {
  const {
    data: user,
    error: checkAuthError,
    isLoading: checkAuthIsLoading,
  } = useCheckAuthQuery()

  const [
    logout,
    { data: logoutData, isLoading: logoutIsLoading, error: logoutError },
  ] = useLogoutMutation()
  return (
    <div>
      {!checkAuthError ? (
        <>
          <button onClick={logout}>LOGOUT</button>
          <h5>Welcome {user.name}</h5>
        </>
      ) : (
        <>
          <Link to="/register">REGISTER</Link>
          <Link to="/login">LOGIN</Link>
        </>
      )}
    </div>
  )
}

export default Navbar
