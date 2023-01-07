import styles from './Form.module.css'
import Button from '../UI/Button'

export default function SignInForm({ onConfirm, onCancel, userBase }) {
  function handleFromSubmit(event) {
    event.preventDefault()
    const mail = event.target.email.value
    const pass = event.target.password.value
    const filteredUser = userBase.filter(
      (user) => user.email === mail && user.password === pass
    )[0]
    console.log(filteredUser)
    filteredUser
      ? onConfirm({
          id: filteredUser.id,
          firstName: filteredUser.firstName,
          secondName: filteredUser.secondName,
          email: filteredUser.email,
          password: filteredUser.password,
          todoList: filteredUser.todoList,
        })
      : alert('Неправильно введен email или пароль')
  }

  function handleFromCancel(event) {
    event.preventDefault()
    console.log('canceled')
    onCancel()
  }

  return (
    <div className={styles.inputForm}>
      <form className={styles.inputBackground} onSubmit={handleFromSubmit}>
        <h2 className={styles.formHeader}>Для входа введите ваши данные</h2>
        <hr />
        <div className={styles.formList}>
          <label htmlFor='email'>Email:</label>
          <input
            required
            id='email'
            type='email'
            defaultValue='sergio_passad@gmail.com'
          />

          <label htmlFor='password'>Пароль:</label>
          <input
            required
            id='password'
            type='password'
            defaultValue='Example123'
          />
        </div>
        <Button children='Подтвердить' type='submit' />
        <Button children='Отмена' type='cancel' onClick={handleFromCancel} />
      </form>
    </div>
  )
}
