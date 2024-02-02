import { z } from "zod";
import { BaseElementSchema, ElementType } from "./base-element";
import { ValidationSchema } from "./validation";

export enum InputVariation {
  TEXT = "text",
  NUMBER = "number",
}

export const InputElementSchema = BaseElementSchema.merge(
  z.object({
    variation: z.nativeEnum(InputVariation),
    label: z.string(),
    name: z.string(),
    multiple: z.boolean(),
    description: z.string().optional(),
    placeholder: z.string().optional(),
    validation: ValidationSchema,
    type: z.literal(ElementType.INPUT),
  })
);
