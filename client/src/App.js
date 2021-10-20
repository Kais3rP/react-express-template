import React, { useState, useEffect } from 'react'
import './App.css'
import Test from './features/test/Test'
import { useGetUserQuery } from './services'
import { convertFormdataEntriesToObject } from './utils'

function App() {
  const [id, setId] = useState('')
  const [isSkip, setIsSkip] = useState(true)
  const { user, error, isLoading, refetch } = useGetUserQuery(id, {
    skip: isSkip,
  })
  console.log(id)
  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setIsSkip(false)
          refetch(convertFormdataEntriesToObject(e.target))
        }}
      >
        <input value={id} onChange={(e) => setId(e.target.value)} />
        <input type="submit" />
      </form>
      <Test />
    </div>
  )
}

export default App
