import { z } from "zod";
import { BaseElementSchema, ElementType } from "./base-element";

enum ButtonVariation {
  SUBMIT = "submit",
}

export const ButtonElementSchema = BaseElementSchema.merge(
  z.object({
    variation: z.nativeEnum(ButtonVariation),
    type: z.literal(ElementType.BUTTON),
  })
);
