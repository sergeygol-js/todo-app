import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import InputForm from './components/forms/InputForm'
import TodoForm from './components/Todos/TodoForm'
import TodoList from './components/Todos/TodoList'
import TodosActions from './components/Todos/TodosActions'
import RegButton from './components/RegButton'
import Popup from './components/UI/Popup'

function App() {
  const [todos, setTodos] = useState([])
  const [form, setForm] = useState(false)
  const [popup, setPopup] = useState(false)
  const [popUpCoords, setPopUpCoords] = useState({ left: 0, top: 0 })

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

  const togglePopUp = () => {
    setPopup(!popup)
  }

  const openRegForm = (e) => {
    const element = e.target.getBoundingClientRect()
    const x = element.left
    const y = element.top - 80

    setPopUpCoords({ left: x, top: y })
    console.log(popUpCoords.left, popUpCoords.top)
    togglePopUp()
  }

  const toggleRegistrForm = () => {
    setForm(!form)
    setPopup(false)
  }

  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length
  console.log(completedTodosCount)

  return (
    <>
      {popup ? (
        <Popup
          left={popUpCoords.left}
          top={popUpCoords.top}
          onConfirm={toggleRegistrForm}
          onCancel={togglePopUp}
        />
      ) : null}
      {form && (
        <InputForm onConfirm={changeUserData} onCancel={toggleRegistrForm} />
      )}
      <div className='App'>
        <h1>Todo App</h1>

        {userData.firstName ? (
          <h2
            style={{ marginBottom: '15px' }}
          >{`Привет, ${userData.firstName}! Вы вошли.`}</h2>
        ) : (
          <>
            <RegButton onClick={openRegForm} />
          </>
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
          <h2>{`У вас есть ${completedTodosCount} ${
            completedTodosCount > 1
              ? completedTodosCount < 5
                ? 'выполненные задач'
                : 'выполненных задач'
              : 'выполненная задача'
          }`}</h2>
        )}
      </div>
    </>
  )
}

export default App
