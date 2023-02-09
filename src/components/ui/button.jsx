const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className,
}) => {
  return (
    <button
      className={className === undefined ? 'btn' : `btn ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
