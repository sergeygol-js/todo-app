import Button from './UI/Button'

export default function RegButton({ onClick }) {
  return (
    <>
      <hr style={{ margin: '30px 0 10px 0' }} />
      <h3>Для сохранения и отображения ваших задач</h3>
      <h3>
        Вы можете:
        <Button
          style={{
            margin: '15px 10px 10px 10px',
            fontSize: '15px',
            fontWeight: '5px',
            width: '170px',
            height: '30px',
            padding: '0',
          }}
          children='Зарегистрироваться'
          onClick={onClick}
        />
        или
        <Button
          style={{
            margin: '15px 10px 10px 10px',
            fontSize: '15px',
            fontWeight: '5px',
            width: '70px',
            height: '30px',
            padding: '0px',
          }}
          children='Войти'
          onClick={onClick}
        />
      </h3>
      <hr style={{ marginBottom: '30px' }} />
    </>
  )
}
