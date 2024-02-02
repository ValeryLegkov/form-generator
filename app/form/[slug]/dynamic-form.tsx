"use client";

import { useStoreMap } from "effector-react";
import { ElementType } from "@/src/shared/validation";
import { FormEvent } from "react";
import { nanoid } from "nanoid";
import { Button, DynamicFormInput, Typography } from "./components";
import { pickStoreFields } from "./helper";
import { $form } from "./model";
import { ValidatedRawConfig, DynamicFormConfigField } from "./type";

const ELEMENTS_MAP = {
  [ElementType.INPUT]: DynamicFormInput,
};

/**
 * TODO:
 * - To fix all types.
 * - to rewrite error handling in case on config available.
 */
export const DynamicForm = () => {
  const { raw } = useStoreMap({
    store: $form,
    keys: ["raw"],
    fn: pickStoreFields<{ raw: ValidatedRawConfig }>,
    updateFilter: (update, current) => false,
  });

  if (!raw) {
    return <div>Failed to display form.</div>;
  }

  return (
    <form
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("subbmitting!!", event);
      }}
    >
      {raw!.map((row: Array<DynamicFormConfigField>) => {
        return (
          <div key={nanoid()} className="flex align-center">
            {row.map((element: DynamicFormConfigField) => {
              if (element.type === ElementType.TYPOGRAPHY) {
                return (
                  <Typography
                    key={element.id}
                    value={element.default as string}
                  />
                );
              }

              if (element.type === ElementType.BUTTON) {
                return (
                  <Button key={element.id} value={element.default as string} />
                );
              }

              const Element = ELEMENTS_MAP[element.type];

              return <Element key={element.id} name={element.name} />;
            })}
          </div>
        );
      })}
    </form>
  );
};
