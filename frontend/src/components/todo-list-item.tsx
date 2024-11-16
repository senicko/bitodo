import { ChangeEventHandler, useId } from "react";
import { Todo, updateTodo } from "../api/todos";
import { Link } from "react-router-dom";
import { cn, dateShortFormatter } from "../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodosQueryOptions } from "../queries/todos";

export type TodoListItemProps = {
  todo: Todo;
  className?: string;
  onComplete: () => void;
  onArchive: () => void;
};

export function TodoListItem({ todo }: TodoListItemProps) {
  const id = useId();
  const queryClient = useQueryClient();

  const completeTodoMutation = useMutation({
    mutationFn: (completed: boolean) => updateTodo(todo.id, { completed }),
    onSuccess: () => {
      console.log("on success");
      queryClient.refetchQueries(getTodosQueryOptions);
    },
  });

  const handleTodoCompleteChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    completeTodoMutation.mutate(e.currentTarget.checked);
  };

  return (
    <Link to={`/${todo.id}`} className="w-full">
      <div
        className={cn(
          "flex border rounded-md border-neutral-200 hover:bg-neutral-50 transition-colors",
          todo.completed && "bg-neutral-100"
        )}
      >
        <label
          htmlFor={id}
          className="grid place-items-center size-12 gap-4 items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            id={id}
            type="checkbox"
            checked={todo.completed}
            onChange={handleTodoCompleteChange}
            disabled={completeTodoMutation.isPending}
          />
        </label>
        <div className="flex grow justify-between items-center py-2 pr-4 gap-2">
          <p className="text-neutral-900 text-ellipsis text-nowrap md:max-w-[400px] max-w-[250px] overflow-hidden">
            {todo.title}
          </p>
          <p className="text-neutral-400">
            {dateShortFormatter.format(new Date(todo.createdAt))}
          </p>
        </div>
      </div>
    </Link>
  );
}
