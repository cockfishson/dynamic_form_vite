import { useEffect, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "./form_input/form_input";
import { SelectButtonGroup } from "./select_button_group/select_button_group";
import { RadioButtonGroup } from "./radio_button_group/radio_button_group";
import { FormButton } from "./form_button/form_button";
import { LogisticsFieldGroup } from "./logistics_field_group/logistics_field_group";
import { validationSchema } from "../../helpers/validation";
import {
  extractChangedFields,
  extractFilledFields,
} from "../../helpers/extractors";
import "./event_form.css";

export const EventForm = ({ defaultValues = {}, onSubmit }) => {
  const isEdit = Boolean(
    defaultValues && Object.keys(defaultValues).length > 0
  );
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, dirtyFields },
    reset,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "logistics",
  });

  const show_budget_details = watch("show_budget_details") === "yes";

  const handleReset = useCallback(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    handleReset();
  }, [defaultValues, handleReset]);

  const handleFormSubmit = useCallback(
    (data) => {
      const payload = isEdit
        ? extractChangedFields(data, dirtyFields)
        : extractFilledFields(data);
      onSubmit(payload);
    },
    [isEdit, dirtyFields, onSubmit]
  );

  return (
    <div className="event_form_container">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="event_form_wrapper"
      >
        <div className="form_grid form_grid_3">
          <FormInput
            inputText="Title*"
            inputId="title"
            register={register("title")}
            error={errors.title}
          />
          <SelectButtonGroup
            label="Category*"
            selectButtonGroupId="category"
            register={register("category")}
            options={[
              { value: "", label: "Select category" },
              { value: "Technology", label: "Technology" },
              { value: "Business", label: "Business" },
              { value: "Entertainment", label: "Entertainment" },
            ]}
            error={errors.category}
          />
          <FormInput
            inputText="Date*"
            inputId="date"
            type="date"
            register={register("date")}
            error={errors.date}
          />
        </div>
        <div className="form_grid form_grid_2">
          <FormInput
            inputText="Budget*"
            inputId="budget"
            type="number"
            register={register("budget")}
            error={errors.budget}
          />
          <FormInput
            inputText="Capacity*"
            inputId="capacity"
            type="number"
            register={register("capacity")}
            error={errors.capacity}
          />
        </div>
        <div className="form_grid form_grid_2">
          <FormInput
            inputText="Organizer*"
            inputId="organizer"
            register={register("organizer")}
            error={errors.organizer}
          />
          <FormInput
            inputText="Speakers*"
            inputId="speakers"
            type="number"
            register={register("speakers")}
            error={errors.speakers}
          />
        </div>
        <RadioButtonGroup
          radioGroupText="Show Budget Details?"
          register={register("show_budget_details")}
          options={[
            {
              value: "yes",
              label: "Yes",
              defaultChecked: defaultValues?.show_budget_details === "yes",
            },
            {
              value: "no",
              label: "No",
              defaultChecked: defaultValues?.show_budget_details !== "yes",
            },
          ]}
          error={errors.show_budget_details}
        />
        {show_budget_details ? (
          <div className="form_grid form_grid_2">
            <FormInput
              inputText="Additional Budget Notes"
              inputId="budget_notes"
              register={register("budget_notes")}
              error={errors.budget_notes}
            />
          </div>
        ) : (
          <div></div>
        )}
        <LogisticsFieldGroup
          fields={fields}
          register={register}
          errors={errors}
          append={append}
          remove={remove}
        />
        <div className="form_actions">
          <FormButton
            type="submit"
            className="submit_button"
            buttonText="Submit"
          />
        </div>
      </form>
    </div>
  );
};
