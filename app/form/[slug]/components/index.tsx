"use client";

import { useStoreMap, useUnit } from "effector-react";
import { ChangeEvent } from "react";
import { pickStoreFields } from "../helper";
import { formFieldChange, $form } from "../model";
import { FormField } from "../type";
import { InputVariation } from "@/src/shared/validation";

export function DynamicFormInput({ name }: { name: string }) {
  const { fieldChanged } = useUnit({ fieldChanged: formFieldChange });
  const fieldState = useStoreMap({
    store: $form,
    keys: [`fields.${name}`],
    fn: pickStoreFields<{ [name: string]: FormField }>,
    updateFilter: (update, current) => {
      return update[name].value !== current[name].value;
    },
  });

  const state = fieldState[name];
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;
    const value =
      state.variation === InputVariation.NUMBER && Boolean(targetValue)
        ? Number(targetValue)
        : targetValue;

    fieldChanged([name, value]);
  };

  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {name}
      </label>
      <input
        onInput={handleChange}
        value={fieldState[name].value}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        id={name}
      />
    </>
  );
}

/**
 * Would be nice to implement something like MUI Typography
 * https://mui.com/material-ui/react-typography/
 */
export function Typography({ value }: { value: string }) {
  return <div>{value}</div>;
}

export function Button({ value }: { value: string }) {
  const { isValid } = useStoreMap({
    store: $form,
    keys: ["isValid"],
    fn: pickStoreFields<{ isValid: boolean }>,
    updateFilter: (update, current) => {
      return update.isValid !== current.isValid;
    },
  });

  return (
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      disabled={!isValid}
    >
      {value}
    </button>
  );
}
