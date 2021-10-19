import React, { useState, useEffect } from 'react'
import './App.css'
import { useGetUserQuery } from './services/test'

function App() {
  const [id, setId] = useState('')
  const { user, error, isLoading, refetch } = useGetUserQuery(id, {
    skip: true,
  })
  console.log(id)
  return (
    <div className="App">
      <form onSubmit={refetch}>
        <input value={id} onChange={(e) => setId(e.target.value)} />
        <input type="submit" />
      </form>
    </div>
  )
}

export default App
