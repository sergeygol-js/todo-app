import styles from './Button.module.css'

function Button(props) {
  const { children, disabled = false, btype = 'button' } = props

  return (
    <button {...props} className={styles[btype]} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
