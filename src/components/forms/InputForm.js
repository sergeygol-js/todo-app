import styles from './InputForm.module.css'
import Button from '../UI/Button'

export default function InputForm({ onConfirm, onCancel }) {
  function handleFromSubmit(event) {
    event.preventDefault()
    onConfirm(
      event.target.firstName.value,
      event.target.secondName.value,
      event.target.email.value,
      event.target.password.value
    )
  }

  function handleFromCancel(event) {
    event.preventDefault()
    console.log('canceled')
    onCancel()
  }

  return (
    <div className={styles.inputForm}>
      <form className={styles.inputBackground} onSubmit={handleFromSubmit}>
        <h2 className={styles.formHeader}>Регистрация</h2>
        <hr />
        <div className={styles.formList}>
          <label htmlFor='firstName'>Имя:</label>
          <input
            id='firstName'
            type='text'
            defaultValue='Sergio' //change to placeholder after test ends)
          />

          <label htmlFor='secondName'>Фамилия:</label>
          <input id='secondName' type='text' defaultValue='Passad' />

          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            defaultValue='sergio_passad@gmail.com'
          />

          <label htmlFor='password'>Пароль:</label>
          <input id='password' type='password' defaultValue='Example123' />
        </div>
        <Button children='Подтвердить' type='submit' />
        <Button children='Отмена' type='cancel' onClick={handleFromCancel} />
      </form>
    </div>
  )
}
