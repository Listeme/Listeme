const Button = ({title, activeClass, _callback}) => {
  return (
  <Button className={activeClass} onClick={_callback}>{title}</Button>
  )
}

export default Button


