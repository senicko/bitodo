import { AddTodoForm } from "../components/add-todo-form";
import { CenteredLayout } from "../components/centered-layout";

export function NewPage() {
  return (
    <CenteredLayout className="flex flex-col gap-16">
      <h1 className="text-2xl font-medium text-neutral-900">Create new Todo</h1>
      <AddTodoForm />
    </CenteredLayout>
  );
}
