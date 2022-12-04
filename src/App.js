import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import InputForm from './components/forms/InputForm'
import SignInForm from './components/forms/SignInForm'
import TodoForm from './components/Todos/TodoForm'
import TodoList from './components/Todos/TodoList'
import TodosActions from './components/Todos/TodosActions'
import RegButton from './components/RegButton'
import Popup from './components/UI/Popup'
import Button from './components/UI/Button'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([])
  const [modalForm, setModalForm] = useState(false)
  const [popup, setPopup] = useState(false)
  const [popUpCoords, setPopUpCoords] = useState({ left: 0, top: 0 })
  const [popUpState, setPopUpState] = useState(false)
  const [activeUserData, setActiveUserData] = useState({})
  const [allTodos, setAllTodos] = useState([])
  const [authForm, setAuthForm] = useState(false)
  const [userBase, setUserBase] = useState(null)
  const popupFunc = useRef(null)
  const usersURL = 'https://jsonplaceholder.typicode.com/users'
  const todosURL = 'https://jsonplaceholder.typicode.com/todos'

  useEffect(() => {
    axios.get(todosURL).then((response) => {
      const todosBase = response.data.map((data) => ({
        text: data.title,
        isCompleted: data.completed,
        id: data.id,
        userId: data.userId,
      }))
      setAllTodos(todosBase)
    })
  }, [])

  useEffect(() => {
    axios.get(usersURL).then((response) => {
      const tempBase = response.data.map((data) => ({
        id: data.id,
        firstName: data.name.split(' ')[0],
        secondName: data.name.split(' ')[1],
        email: data.email,
        password: data.username,
        todoList: allTodos.filter((todo) => todo.userId === data.id),
      }))
      setUserBase(tempBase)
    })
  }, [allTodos])

  console.log(userBase)

  const addTodoHandler = (text) => {
    if (text !== '') {
      const newTodo = {
        text,
        isCompleted: false,
        id: uuidv4(),
        userId: activeUserData.id ? activeUserData.id : -1,
      }
      setTodos([...todos, newTodo])
      setActiveUserData({ ...activeUserData, todos: [...todos, newTodo] })
    }
    console.log(activeUserData)
  }

  const changeActiveUserData = ({
    id = uuidv4(),
    firstName,
    secondName,
    email,
    password,
    todoList = todos,
  }) => {
    const data = {
      id,
      firstName,
      secondName,
      email,
      password,
      todoList,
    }
    setActiveUserData(data)
    data.firstName && setModalForm(false)
    console.log(activeUserData)
    setAuthForm(false)
    setTodos(todoList)
  }
  console.log(activeUserData)

  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    setActiveUserData({ ...activeUserData, todos: todos })
  }

  const toggleTodoHandler = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : { ...todo }
      })
    )
    setActiveUserData({ ...activeUserData, todos: todos })
  }

  const resetTodosHandler = () => {
    setTodos([])
    setActiveUserData({ ...activeUserData, todos: todos })
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
    if (popupFunc.current) {
      popupFunc.current()
      setPopup(false)
    }
  }

  const popUpCancel = () => {
    setPopup(false)
    setPopUpState(false)
  }

  const logout = (e) => {
    togglePopUp(e)
    popupFunc.current = () => {
      changeActiveUserData('', '', '', '', '', '')
    }
  }

  const resetTodosPop = (e) => {
    togglePopUp(e)
    popupFunc.current = () => {
      resetTodosHandler()
    }
  }

  const deleteCompletedTodosPop = (e) => {
    togglePopUp(e)
    popupFunc.current = () => {
      deleteCompletedTodosHandler()
    }
  }

  const toggleRegistrForm = () => {
    setModalForm(!modalForm)
  }

  const toggleAuthForm = () => {
    setAuthForm(!authForm)
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
        <InputForm
          onConfirm={changeActiveUserData}
          onCancel={toggleRegistrForm}
        />
      )}

      {authForm && (
        <SignInForm
          userBase={userBase}
          onConfirm={changeActiveUserData}
          onCancel={toggleAuthForm}
        />
      )}

      <div className='App'>
        <h1>Todo App</h1>

        {activeUserData.firstName ? (
          <>
            <h2>{`Привет, ${activeUserData.firstName}! Вы вошли`} </h2>
            <Button btype='exitButton' children='Выйти' onClick={logout} />
          </>
        ) : (
          <>
            <RegButton
              onClickReg={toggleRegistrForm}
              onClickAuth={toggleAuthForm}
            />
          </>
        )}

        <TodoForm addTodo={addTodoHandler} />
        {!!todos.length && (
          <TodosActions
            completedTodosExist={!!completedTodosCount}
            resetTodos={resetTodosPop}
            deleteCompletedTodos={deleteCompletedTodosPop}
          />
        )}

        <TodoList
          todos={todos}
          deleteTodo={deleteTodoHandler}
          toggleTodo={toggleTodoHandler}
        />

        {!!completedTodosCount && (
          <h2>{`Выполненных задач: ${completedTodosCount}`}</h2>
        )}
      </div>
    </>
  )
}

export default App
