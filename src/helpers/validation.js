import * as yup from "yup";

export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Max length is 100 characters"),
  category: yup.string().required("Category is required"),
  date: yup.date().required("Date is required"),
  budget: yup
    .number()
    .typeError("Budget must be a number")
    .required("Budget is required")
    .min(1, "Budget must be at least 1"),
  capacity: yup
    .number()
    .typeError("Capacity must be a number")
    .required("Capacity is required")
    .min(1, "Capacity must be at least 1"),
  organizer: yup.string().required("Organizer is required"),
  speakers: yup
    .number()
    .typeError("Speakers must be a number")
    .required("Speakers are required")
    .min(1, "At least one speaker is required"),
  show_budget_details: yup
    .string()
    .oneOf(["yes", "no"], "Please select an option")
    .required("Please select an option"),
  budget_notes: yup.string().notRequired(),
  logistics: yup.array().of(
    yup.object({
      item: yup.string().required("Logistics item is required"),
      status: yup.string().required("Status is required"),
    })
  ),
});
