import React from 'react'
import { useLoginMutation } from '../../services'
import { convertFormdataEntriesToObject } from '../../utils'

const Login = () => {
  const [
    login,
    {
      status: logStatus,
      error: logError,
      data: logData,
      isLoading: logIsLoading,
      isSuccess: logIsSuccess,
    },
  ] = useLoginMutation()
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          login(convertFormdataEntriesToObject(e.target))
        }}
      >
        <h2>Login</h2>
        <h5>Email</h5>
        <input name="email" />
        <h5>Password</h5>
        <input name="password" type="password" />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Login
