import Button from './UI/Button'

export default function RegButton({ onClick }) {
  return (
    <>
      <hr style={{ margin: '30px 0 10px 0' }} />
      <h3>Для сохранения и отображения ваших задач</h3>
      <h3>
        Вы можете:
        <Button
          btype='smallButton'
          children='Зарегистрироваться'
          onClick={onClick}
        />
        или
        <Button btype='smallButton' children='Войти' onClick={onClick} />
      </h3>
      <hr style={{ marginBottom: '30px' }} />
    </>
  )
}
