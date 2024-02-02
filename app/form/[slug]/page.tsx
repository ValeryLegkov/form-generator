import { notFound } from "next/navigation";
import { EffectorNext } from "@effector/next";
import { allSettled, fork, serialize } from "effector";

import { queryConfig } from "./model";
import { DynamicForm } from "./dynamic-form";

type PageProps = Readonly<{ params: { slug: string } }>;

export default async function Page({ params }: PageProps) {
  const scope = fork();

  await allSettled(queryConfig.start, { scope, params });

  const values = serialize(scope);

  if (!scope.getState(queryConfig.$data)) {
    return notFound();
  }

  return (
    <EffectorNext values={values}>
      <DynamicForm />
    </EffectorNext>
  );
}
