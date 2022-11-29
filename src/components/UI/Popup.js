import styles from './Popup.module.css'
import Button from './Button'

function Popup({ left, top, onConfirm, onCancel }) {
  return (
    <div
      style={{ position: 'absolute', marginLeft: left, marginTop: top }}
      className={styles.bg}
    >
      <Button
        onClick={onConfirm}
        buttonStyle='popup'
        children='Подтвердить'
        type='submit'
      />
      <Button
        onClick={onCancel}
        buttonStyle='popup'
        children='Отмена'
        type='cancel'
      />
    </div>
  )
}

export default Popup
