import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getTodoByIdQueryOptions } from "../queries/todos";
import { CenteredLayout } from "../components/ui/centered-layout";
import { dateFullFormatter } from "../lib/utils";
import { Button } from "../components/ui/button";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useDeleteTodoMutation } from "../hooks/use-delete-todo-mutation";

export function TodoPage() {
  const { todoId } = useParams<"todoId">();
  const navigate = useNavigate();

  const todoQuery = useQuery(getTodoByIdQueryOptions(parseInt(todoId!)));
  const deleteTodoMutation = useDeleteTodoMutation({
    onSuccess: () => navigate("/"),
  });

  const handleTodoDelete = () => deleteTodoMutation.mutate(parseInt(todoId!));

  return (
    <CenteredLayout className="flex flex-col gap-4">
      {todoQuery.data && (
        <>
          <h1 className="text-xl text-neutral-900">{todoQuery.data.title}</h1>
          <div>
            <p className="text-neutral-500">Created At</p>
            <p className="text-neutral-900">
              {dateFullFormatter.format(new Date(todoQuery.data.createdAt))}
            </p>
          </div>
          <div>
            <p className="text-neutral-500">Completed</p>
            <p className="text-neutral-900">
              {todoQuery.data.completed ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p className="text-neutral-500">Description</p>
            <p className="text-neutral-900">{todoQuery.data.description}</p>
          </div>
          <div className="flex justify-end border-t border-neutral-200 py-4">
            <Button
              className="bg-red-500 hover:bg-red-800 flex items-center gap-2"
              onClick={handleTodoDelete}
            >
              Delete
              <TrashIcon className="size-4" />
            </Button>
          </div>
        </>
      )}
    </CenteredLayout>
  );
}
