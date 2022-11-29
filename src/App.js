import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import InputForm from './components/InputForm'
import TodoForm from './components/Todos/TodoForm'
import TodoList from './components/Todos/TodoList'
import TodosActions from './components/Todos/TodosActions'
import RegButton from './components/RegButton'

function App() {
  const [todos, setTodos] = useState([])
  const [form, setForm] = useState(false)
  const [userData, setUserData] = useState({})

  const addTodoHandler = (text) => {
    if (text !== '') {
      const newTodo = {
        text: text, //можно просто text
        isCompleted: false,
        id: uuidv4(),
      }
      setTodos([...todos, newTodo])
    }
  }

  const changeUserData = (fName, sName, email, password) => {
    const data = {
      firstName: fName,
      secondName: sName,
      email,
      password,
    }
    setUserData(data)
    toggleRegistrForm()
  }
  console.log(userData) //userData - данные пользователя

  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodoHandler = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : { ...todo }
      })
    )
  }

  const resetTodosHandler = () => {
    setTodos([])
  }

  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted))
  }

  const toggleRegistrForm = () => {
    setForm(!form)
  }

  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length
  console.log(completedTodosCount)

  return (
    <>
      {form && <InputForm onClick={changeUserData} />}
      <div className='App'>
        <h1>Todo App</h1>

        {userData.firstName ? (
          <h2
            style={{ marginBottom: '15px' }}
          >{`Hello, ${userData.firstName}! You are in.`}</h2>
        ) : (
          <RegButton onClick={toggleRegistrForm} />
        )}

        <TodoForm addTodo={addTodoHandler} />
        {!!todos.length && (
          <TodosActions
            completedTodosExist={!!completedTodosCount}
            resetTodos={resetTodosHandler}
            deleteCompletedTodos={deleteCompletedTodosHandler}
          />
        )}

        <TodoList
          todos={todos}
          deleteTodo={deleteTodoHandler}
          toggleTodo={toggleTodoHandler}
        />

        {!!completedTodosCount && (
          <h2>{`You have completed ${completedTodosCount} ${
            completedTodosCount > 1 ? 'todos' : 'todo'
          }`}</h2>
        )}
      </div>
    </>
  )
}

export default App
