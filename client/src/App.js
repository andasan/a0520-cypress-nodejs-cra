import React, { useState, useEffect, useRef } from 'react'
import DoneTodoComp from './components/DoneTodoComp'
import TodoListComp from './components/TodoListComp'

function App() {
  const [todoList, setTodoList] = useState([])
  const newTodoRef = useRef()

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch('/api/todo')
      const lists = await response.json()
      setTodoList(lists)
    }
    fetchTodo()
  }, [])

  const createdTodo = async () => {
    const response = await fetch('/api/todo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTodoRef.current.value, done: false }),
    })

    const newTodo = await response.json()

    setTodoList((prevState) => {
      return [...prevState, newTodo]
    })

    newTodoRef.current.value = ''
  }

  const doneTodo = async (e) => {
    const { id } = e.target

    const response = await fetch(`/api/todo/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done: true }),
    })

    const updatedTodo = await response.json()

    setTodoList((prevState) => {
      return prevState.map((item) =>
        item._id === updatedTodo._id
          ? { ...item, done: updatedTodo.done }
          : item
      )
    })
  }

  const undoDoneTodo = async (id) => {
    const response = await fetch(`/api/todo/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done: false }),
    })

    const updatedTodo = await response.json()

    setTodoList((prevState) => {
      return prevState.map((item) =>
        item._id === updatedTodo._id
          ? { ...item, done: updatedTodo.done }
          : item
      )
    })
  }

  return (
    <div className='container mt-3 w-100'>
      <h1 className='mb-5 text-center'>Got something to do?</h1>
      <div className='row'>
        <div className='col-8 pr-5'>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              id='newTODO'
              cy-data='new-todo'
              ref={newTodoRef}
            />
            <button
              className='btn btn-primary ml-3'
              id='create-todo'
              onClick={createdTodo}
            >
              Create
            </button>
          </div>
          <table className='table text-center'>
            <tbody id='todo-body'>
              <TodoListComp todoList={todoList} doneTodo={doneTodo} />
            </tbody>
          </table>
        </div>
        <div className='col-4'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col' colSpan='2'>
                  Completed ✅
                </th>
              </tr>
            </thead>
            <tbody id='done-body'>
              <DoneTodoComp todoList={todoList} undoDoneTodo={undoDoneTodo} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
