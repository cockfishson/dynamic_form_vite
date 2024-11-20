export const FormButton = ({
  type = "button",
  onClick,
  className,
  buttonText,
}) => (
  <button type={type} onClick={onClick} className={className}>
    {buttonText}
  </button>
);
