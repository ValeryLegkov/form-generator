import { z } from "zod";
import { TypographyElementSchema } from "./typography-element";
import { InputElementSchema } from "./input-element";
import { ButtonElementSchema } from "./button-element";

export const DynamicFormSchema = z.array(
  z.array(
    z.union([TypographyElementSchema, InputElementSchema, ButtonElementSchema])
  )
);
