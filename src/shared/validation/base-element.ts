import { z } from "zod";

export enum ElementType {
  TYPOGRAPHY = "typography",
  INPUT = "input",
  BUTTON = "button",
}

export const BaseElementSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(ElementType),
  default: z.string().or(z.number()),
});
