import React from 'react'
import { useRegisterMutation } from '../../services'
import { convertFormdataEntriesToObject } from '../../utils'

const Register = () => {
  const [
    register,
    {
      status: regStatus,
      error: regError,
      data: regData,
      isLoading: regIsLoading,
      isSuccess: regIsSuccess,
    },
  ] = useRegisterMutation()

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          register(convertFormdataEntriesToObject(e.target))
        }}
      >
        <h2>Register</h2>
        <h5>Name</h5>
        <input name="name" />
        <h5>Email</h5>
        <input name="email" />
        <h5>Password</h5>
        <input name="password" type="password" />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Register
