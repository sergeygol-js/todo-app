import Todo from './Todo'
import styles from './TodoList.module.css'

function TodoList(props) {
  const { todos, deleteTodo, toggleTodo } = props

  return (
    <div className={styles.todoListContainer}>
      {!todos.length && <h2>Нет доступных задач</h2>}
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </div>
  )
}

export default TodoList
