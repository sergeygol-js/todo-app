import Button from './UI/Button'

export default function RegButton({ onClickReg, onClickAuth }) {
  return (
    <>
      <hr style={{ margin: '30px 0 10px 0' }} />
      <h3>Для сохранения и отображения ваших задач</h3>
      <h3>
        Вы можете:
        <Button
          btype='smallButton'
          children='Зарегистрироваться'
          onClick={onClickReg}
        />
        или
        <Button
          style={{ width: '80px' }}
          btype='smallButton'
          children='Войти'
          onClick={onClickAuth}
        />
      </h3>
      <hr style={{ marginBottom: '30px' }} />
    </>
  )
}
