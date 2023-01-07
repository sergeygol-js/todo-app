import styles from './Form.module.css'
import Button from '../UI/Button'

export default function InputForm({ onConfirm, onCancel }) {
  function handleFromSubmit(event) {
    event.preventDefault()
    onConfirm({
      firstName: event.target.firstName.value,
      secondName: event.target.secondName.value,
      email: event.target.email.value,
      password: event.target.password.value,
    })
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
            required
            id='firstName'
            type='text'
            defaultValue='Sergio' //change to placeholder after test ends)
          />

          <label htmlFor='secondName'>Фамилия:</label>
          <input required id='secondName' type='text' defaultValue='Passad' />

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
