import { useState } from 'react'
import './App.scss'

import ShowTodoList from './components/todos/showTodoList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateTodo from './components/todos/createTodo'

const  App =() => {
  const [count, setCount] = useState(0)

  return (
    <div className="app-contents">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowTodoList/>} />
          <Route path="/create-todo" element={<CreateTodo/>} />
          {/* <ShowTodoList/> */}
        </Routes>
      </BrowserRouter>
      {/* <h1 className="text-3xl text-red-900 font-bold underline">
        Hello world!
      </h1> */}
    </div>
  )
}

export default App
