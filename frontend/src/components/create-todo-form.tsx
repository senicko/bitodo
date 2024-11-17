import { zodResolver } from "@hookform/resolvers/zod";
import { FieldPath, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useCreateTodoMutation } from "../hooks/use-create-todo-mutation";
import { Button } from "./ui/button";

const createTodoFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Todo title must be at least 1 character long!" }),
  description: z.string(),
});

type CreateTodoFormSchema = z.infer<typeof createTodoFormSchema>;

export function CreateTodoForm() {
  const navigate = useNavigate();

  const form = useForm<CreateTodoFormSchema>({
    resolver: zodResolver(createTodoFormSchema),
  });

  const createTodoMutation = useCreateTodoMutation({
    onSuccess: () => navigate("/"),
    onValidationErros: (validationErrors) => {
      validationErrors.forEach((validationError) => {
        const errorPath = validationError.path.join(
          "."
        ) as FieldPath<CreateTodoFormSchema>;

        form.setError(errorPath, {
          message: validationError.message,
        });
      });
    },
  });

  const handleFormSubmit = form.handleSubmit((data) =>
    createTodoMutation.mutate(data)
  );

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label>Title</label>
        <input
          placeholder="Todo title ..."
          className="border border-neutral-200 w-full p-2 rounded-md"
          {...form.register("title")}
        />
        {form.formState.errors.title && (
          <p className="text-red-500">{form.formState.errors.title.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label>Description</label>
        <textarea
          rows={8}
          placeholder="Todo description"
          className="border border-neutral-200 p-2 w-full rounded-md"
          {...form.register("description")}
        />
      </div>
      <div className="flex justify-end">
        <Button disabled={createTodoMutation.isPending}>Create Todo</Button>
      </div>
    </form>
  );
}
