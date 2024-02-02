import { DynamicFormSchema } from "@/src/shared/validation";
import { ValidationSchema } from "@/src/shared/validation/validation";

export type RawConfig = Readonly<Array<Array<Record<string, unknown>>>> | null;

/** Flatten type represented by nested Arrays */
export type Flatten<T> = T extends Array<infer U>
  ? U extends Array<any>
    ? Flatten<U>
    : U
  : T;

export type DynamicFormConfigField = Flatten<typeof DynamicFormSchema._type>;

export type FormField = {
  value: string | number | undefined;
  isValid: boolean;
  isTouched: boolean;
  validation: typeof ValidationSchema._type;
  variation: string;
};

export type FormFieldError = {
  name: string;
  message: string;
};

export type ValidatedRawConfig = null | typeof DynamicFormSchema._type;

export type Form = {
  isValid: boolean;
  submitUrl: string;
  errors: Array<FormFieldError>;
  raw: ValidatedRawConfig;
  fields: {
    [key: string]: FormField;
  };
};
