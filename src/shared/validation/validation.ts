import { z } from "zod";

enum DataType {
  STRING = "string",
  NUMBER = "number",
  UNKNOWN = "unknown",
}

export const ValidationSchema = z
  .object({
    type: z.nativeEnum(DataType),
    required: z.boolean().optional(),
    max: z.number().optional(),
    min: z.number().optional(),
  })
  .optional();

const chooseValidator = (type: DataType) =>
  ({
    [DataType.STRING]: z.string(),
    [DataType.NUMBER]: z.number(),
    [DataType.UNKNOWN]: z.any(),
  }[type]);

export const createDynamicValidation = (
  validators: typeof ValidationSchema._type = { type: DataType.UNKNOWN }
) => {
  const { type, required = false, ...rest } = validators;

  const baseValidator = chooseValidator(type);

  if (type === DataType.UNKNOWN) {
    return baseValidator;
  }

  const validator = Object.entries(rest).reduce((acc, [name, value]) => {
    const typed = name as "max" | "min";

    return (acc as z.ZodString | z.ZodNumber)[typed](value);
  }, baseValidator);

  if (!required) {
    validator.optional();
  }

  return validator;
};
