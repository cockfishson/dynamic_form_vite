import "./radio_button_group.css";

export const RadioButtonGroup = ({
  radioGroupText,
  register,
  options,
  error,
}) => (
  <div className="form_group">
    <label className="radio_header">{radioGroupText}:</label>
    <div className="radio_group">
      {options.map((option) => (
        <label className="radio_text" key={option.value}>
          <input
            type="radio"
            value={option.value}
            {...register}
            defaultChecked={option.defaultChecked}
          />
          {option.label}
        </label>
      ))}
    </div>
    {error && <p className="error_message">{error.message}</p>}
  </div>
);
