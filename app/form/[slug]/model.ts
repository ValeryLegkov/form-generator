import { createQuery } from "@farfetched/core";
import { createEffect, createEvent, createStore, sample } from "effector";
import { DynamicFormSchema, ElementType } from "@/src/shared/validation";
import { createDynamicValidation } from "@/src/shared/validation/validation";
import { DynamicFormConfigField, Form, FormField, RawConfig } from "./type";
import { isFieldValid } from "./helper";
import { FORM_API_BASE_PATH } from "./constant";

export const queryConfig = createQuery<{ slug: string }, RawConfig | null>({
  handler: async ({ slug }) => {
    const path = FORM_API_BASE_PATH + "/" + slug;

    try {
      const config = await fetch(path, { method: "GET" });

      return config.json();
    } catch (error) {
      console.error("Failed to load config.", error);

      return null;
    }
  },
});

const validateConfig = createEffect((config: RawConfig) =>
  DynamicFormSchema.safeParseAsync(config)
);

sample({
  clock: queryConfig.$data,
  target: validateConfig,
});

export const formFieldChange =
  createEvent<[string, string | number | undefined]>();

/**
 * TODO:
 * - To set up @effector/swc-plugin to be able not tot use sid
 */
export const $form = createStore<Form>(
  {
    isValid: false,
    submitUrl: FORM_API_BASE_PATH,
    raw: null,
    fields: {},
    errors: [],
  },
  { sid: "dynamic-form" }
)
  .on(validateConfig.done, (state, { result }) => {
    if (!result.success) {
      return {
        ...state,
        isValid: false,
        errors: [{ name: "invalidConfig", message: "Failed to parse" }],
      };
    }

    const fields = result.data
      .flat()
      .reduce(
        (acc: Record<string, FormField>, next: DynamicFormConfigField) => {
          if (
            next.type !== ElementType.TYPOGRAPHY &&
            next.type !== ElementType.BUTTON
          ) {
            const { default: value, validation, variation } = next;

            acc[next.name] = {
              isValid: isFieldValid(value, validation),
              value,
              validation: validation,
              isTouched: false,
              variation,
            };
          }

          return acc;
        },
        {}
      );

    return {
      ...state,
      isValid: Object.values(fields).every((field) => field.isValid),
      raw: result.data,
      fields,
    };
  })
  .on(formFieldChange, (state: Form, [key, value]) => {
    if (!state.fields[key]) {
      return state;
    }

    const field = state.fields[key];
    const fieldIsValid = createDynamicValidation(field.validation).safeParse(
      value
    ).success;

    const fields = {
      ...state.fields,
      [key]: {
        ...field,
        value,
        isTouched: true,
        isValid: fieldIsValid,
      },
    };

    const formIsValid = Object.values(fields).every((field) => field.isValid);

    return {
      ...state,
      isValid: formIsValid,
      fields,
    };
  });
