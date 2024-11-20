import "./select_button_group.css";

export const SelectButtonGroup = ({
  label,
  register,
  selectButtonGroupId,
  options,
  error,
}) => (
  <div className="form_group">
    <label className="select_label" htmlFor={selectButtonGroupId}>
      {label}:
    </label>
    <select
      id={selectButtonGroupId}
      {...register}
      className={error ? "input_error" : "input"}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="error_message">{error.message}</p>}
  </div>
);
