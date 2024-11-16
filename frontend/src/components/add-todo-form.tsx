import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { createTodo, CreateTodoData } from "../api/todos";
import { getTodosQueryOptions } from "../queries/todos";
import { useNavigate } from "react-router-dom";

const addTodoFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Todo title must be at least 1 character long!" }),
  description: z.string(),
});

type AddTodoFormSchema = z.infer<typeof addTodoFormSchema>;

type AddTodoFormProps = {
  className?: string;
};

export function AddTodoForm({ className }: AddTodoFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation({
    mutationFn: async (createTodoData: CreateTodoData) =>
      await createTodo(createTodoData),
    onSuccess: () => {
      queryClient.refetchQueries(getTodosQueryOptions);
      navigate("/");
    },
  });

  const form = useForm<AddTodoFormSchema>({
    resolver: zodResolver(addTodoFormSchema),
  });

  const handleTodoAdd = form.handleSubmit((data) =>
    addTodoMutation.mutate(data)
  );

  return (
    <form
      onSubmit={handleTodoAdd}
      className={cn("flex flex-col gap-8 w-[512px]", className)}
    >
      <div className="flex flex-col gap-2">
        <label>Title</label>
        <input
          placeholder="Todo title ..."
          className="border border-neutral-200 w-full p-2 rounded-md"
          {...form.register("title")}
        />
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
      <Button>Add Todo</Button>
    </form>
  );
}
