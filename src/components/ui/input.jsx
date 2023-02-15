function Input(props) {
  return (
    <input
      id={props.id}
      type={props.type}
      className={props.className}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      name={props.name}
    />
  );
}

export default Input;
