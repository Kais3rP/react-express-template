import React from 'react'
import { useLoginMutation, useRegisterMutation } from '../../services'
import { convertFormdataEntriesToObject } from '../../utils'

const Test = () => {
  const [register, { regStatus, regError, regData }] = useRegisterMutation()
  const [login, { logStatus, logError, logData }] = useLoginMutation()

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

export default Test
