import styles from './InputForm.module.css'
import Button from './UI/Button'

export default function InputForm({ onClick }) {
  function handleFromSubmit(event) {
    event.preventDefault()
    onClick(
      event.target.firstName.value,
      event.target.secondName.value,
      event.target.email.value,
      event.target.password.value
    )
  }

  return (
    <div className={styles.inputForm}>
      <form className={styles.inputBackground} onSubmit={handleFromSubmit}>
        <h2 className={styles.formHeader}>Input your data here</h2>
        <hr />
        <div className={styles.formList}>
          <label htmlFor='firstName'>First Name:</label>
          <input
            id='firstName'
            type='text'
            defaultValue='Sergio' //change to placeholder after test ends)
          />

          <label htmlFor='secondName'>Second Name:</label>
          <input id='secondName' type='text' defaultValue='Passad' />

          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            defaultValue='sergio_passad@gmail.com'
          />

          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' defaultValue='Example123' />
        </div>
        <Button children='Submit' type='submit' />
      </form>
    </div>
  )
}
