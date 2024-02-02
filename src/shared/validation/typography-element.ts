import { z } from "zod";
import { BaseElementSchema, ElementType } from "./base-element";

enum TypograpyVariation {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  BODY_1 = "body1",
  BODY_2 = "body2",
}

export const TypographyElementSchema = BaseElementSchema.merge(
  z.object({
    variation: z.nativeEnum(TypograpyVariation),
    type: z.literal(ElementType.TYPOGRAPHY),
  })
);
