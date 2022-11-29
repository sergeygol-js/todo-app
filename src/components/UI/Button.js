import styles from './Button.module.css'

function Button(props) {
  const { children, disabled = false, view = 'button' } = props

  return (
    <button
      {...props}
      className={view === 'popup' ? styles.popUpButton : styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
