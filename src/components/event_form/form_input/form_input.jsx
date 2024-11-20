import "./form_input.css";

export const FormInput = ({
  inputText,
  register,
  inputId,
  type = "text",
  error,
}) => (
  <div className="form_group">
    <label className="label_input" htmlFor={inputId}>
      {inputText}:
    </label>
    <input
      id={inputId}
      type={type}
      {...register}
      className={error ? "input_error" : "input"}
    />
    {error && <p className={"error_message"}>{error.message}</p>}
  </div>
);
