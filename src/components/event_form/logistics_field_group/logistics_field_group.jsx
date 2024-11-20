import "./logistics_field_group.css";
import { FormInput } from "../form_input/form_input";
import { SelectButtonGroup } from "../select_button_group/select_button_group";
import { FormButton } from "../form_button/form_button";

export const LogisticsFieldGroup = ({
  fields,
  register,
  errors,
  append,
  remove,
}) => {
  return (
    <div className="logistics_form_group logistics_full_width">
      <h3 className="select_header">Logistics</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="logistics_form_grid logistics_grid_2">
          <FormInput
            inputText={`Logistics Item ${index + 1}*`}
            inputId={`logistics.${index}.item`}
            register={register(`logistics.${index}.item`)}
            error={errors.logistics?.[index]?.item}
            placeholder={`Logistics Item ${index + 1}`}
          />
          <SelectButtonGroup
            label="Status*"
            selectButtonGroupId={`logistics.${index}.status`}
            register={register(`logistics.${index}.status`)}
            options={[
              { value: "", label: "Select status" },
              { value: "Completed", label: "Completed" },
              { value: "Pending", label: "Pending" },
              { value: "In Progress", label: "In Progress" },
            ]}
            error={errors.logistics?.[index]?.status}
          />
          <FormButton
            type="button"
            className="remove_logistics_button logistics_button"
            onClick={() => remove(index)}
            buttonText="Remove"
          />
        </div>
      ))}
      <FormButton
        type="button"
        className="logistics_button"
        onClick={() => append({ item: "", status: "" })}
        buttonText="Add Logistic Item"
      />
    </div>
  );
};
