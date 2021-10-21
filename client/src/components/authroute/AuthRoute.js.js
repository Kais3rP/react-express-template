import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router'
import { useCheckAuthQuery } from '../../services'

const AuthRoute = (props) => {
  const {
    data: user,
    error: checkAuthError,
    isLoading: checkAuthIsLoading,
  } = useCheckAuthQuery()

  return (
    <>
      {props.type === 'private' && checkAuthError ? (
        <Redirect to="/login" />
      ) : props.type === 'guest' && !checkAuthError ? (
        <Redirect to="/" />
      ) : (
        <Route {...props}></Route>
      )}
    </>
  )
}

export default AuthRoute
