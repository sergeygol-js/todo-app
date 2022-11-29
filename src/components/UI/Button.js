import styles from './Button.module.css'

function Button(props) {
  const { children, disabled = false, buttonStyle = 'button' } = props

  return (
    <button
      {...props}
      className={buttonStyle === 'popup' ? styles.popUpButton : styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
