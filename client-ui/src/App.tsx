import { useState } from 'react'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <h1 className="text-3xl text-red-800 font-bold underline">
      Hello world!
    </h1>
  )
}

export default App
