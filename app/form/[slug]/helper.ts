import {
  createDynamicValidation,
  ValidationSchema,
} from "@/src/shared/validation";
import { Form } from "./type";

export const isFieldValid = (
  value: unknown,
  validation: typeof ValidationSchema._type
) => {
  return createDynamicValidation(validation).safeParse(value).success;
};

export const pickStoreFields = <T>(
  form: Form,
  keys: Array<keyof Form | `fields.${keyof Form["fields"]}`>
) =>
  keys.reduce(
    (
      acc: Record<
        keyof Form | keyof Form["fields"],
        Form[keyof Form] | Form["fields"][keyof Form["fields"]]
      >,
      key: keyof Form | `fields.${keyof Form["fields"]}`
    ) => {
      if (key.includes("fields.")) {
        const fieldName = key.split(".")[1];
        acc[fieldName] = form.fields[fieldName];
      } else {
        acc[key] = form[key as keyof Form];
      }

      return acc;
    },
    {}
  ) as T;
