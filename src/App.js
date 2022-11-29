import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import InputForm from './components/forms/InputForm'
import TodoForm from './components/Todos/TodoForm'
import TodoList from './components/Todos/TodoList'
import TodosActions from './components/Todos/TodosActions'
import RegButton from './components/RegButton'
import Popup from './components/UI/Popup'
import Button from './components/UI/Button'

function App() {
  const [todos, setTodos] = useState([])
  const [modalForm, setModalForm] = useState(false)
  const [popup, setPopup] = useState(false)
  const [popUpCoords, setPopUpCoords] = useState({ left: 0, top: 0 })
  const [popUpState, setPopUpState] = useState(false)
  const [userData, setUserData] = useState({})

  const addTodoHandler = (text) => {
    if (text !== '') {
      const newTodo = {
        text, //можно просто text
        isCompleted: false,
        id: uuidv4(),
      }
      setTodos([...todos, newTodo])
      setUserData({ ...userData, todos: [...todos, newTodo] })
    }
    console.log(userData)
  }

  const changeUserData = (fName, sName, email, password) => {
    const data = {
      id: uuidv4(),
      firstName: fName,
      secondName: sName,
      email,
      password,
      todos: todos,
    }
    setUserData(data)
    data.firstName && toggleRegistrForm()
  }
  console.log(userData) //userData - данные пользователя

  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    setUserData({ ...userData, todos: todos })
  }

  const toggleTodoHandler = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : { ...todo }
      })
    )
    setUserData({ ...userData, todos: todos })
  }

  const resetTodosHandler = () => {
    setTodos([])
  }

  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted))
  }

  const togglePopUp = (e) => {
    const element = e.target.getBoundingClientRect()
    const x = element.left
    const y = element.top - 80

    setPopUpCoords({ left: x, top: y })
    console.log(popUpCoords.left, popUpCoords.top)
    setPopup(!popup)
  }

  const popUpConfirm = () => {
    setPopUpState(true)
    setPopup(false)
  }

  const popUpCancel = () => {
    setPopup(false)
    setPopUpState(false)
  }

  const logout = (e) => {
    togglePopUp(e)
  }

  useEffect(() => {
    popUpState && changeUserData('', '', '', '', '', '')
    setPopUpState(false)
  }, [popUpState])

  const toggleRegistrForm = () => {
    setModalForm(!modalForm)
  }

  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length
  console.log(completedTodosCount)

  return (
    <>
      {popup && (
        <Popup
          left={popUpCoords.left}
          top={popUpCoords.top}
          onConfirm={popUpConfirm}
          onCancel={popUpCancel}
        />
      )}
      {modalForm && (
        <InputForm onConfirm={changeUserData} onCancel={toggleRegistrForm} />
      )}
      <div className='App'>
        <h1>Todo App</h1>

        {userData.firstName ? (
          <>
            <h2>{`Привет, ${userData.firstName}! Вы вошли`} </h2>
            <Button
              style={{
                margin: '10px 10px 15px 10px',
                fontSize: '15px',
                fontWeight: '5px',
                width: '70px',
                height: '30px',
                padding: '0px',
                backgroundColor: 'rgba(196, 51, 51, 0.7)',
              }}
              children='Выйти'
              onClick={logout}
            />
          </>
        ) : (
          <>
            <RegButton onClick={toggleRegistrForm} />
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
