import { useState } from 'react'
import Button from '../UI/Button'
import styles from './TodoForm.module.css'

function TodoForm({ addTodo }) {
  const [text, setText] = useState('')

  function onSubmitHandler(event) {
    event.preventDefault()
    addTodo(text)
    setText('')
  }

  return (
    <div className={styles.todoFormContainer}>
      <form onSubmit={onSubmitHandler}>
        <input
          type='text'
          placeholder='Введите новую задачу'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type='submit' title='Submit'>
          Добавить
        </Button>
      </form>
    </div>
  )
}

export default TodoForm
