import Button from './UI/Button'

export default function RegButton({ onClick }) {
  return (
    <>
      <hr style={{ margin: '30px 0 10px 0' }} />
      <h3>For save your todo's</h3>
      <h3>
        You can use:
        <Button
          style={{
            margin: '15px 10px 10px 10px',
            fontSize: '15px',
            fontWeight: '5px',
            width: '150px',
            height: '30px',
            padding: '0px',
          }}
          children='Registration form'
          onClick={onClick}
        />
        or
        <Button
          style={{
            margin: '15px 10px 10px 10px',
            fontSize: '15px',
            fontWeight: '5px',
            width: '70px',
            height: '30px',
            padding: '0px',
          }}
          children='Sign in'
          onClick={onClick}
        />
      </h3>
      <hr style={{ marginBottom: '30px' }} />
    </>
  )
}
