import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTodoByIdQueryOptions,
  getTodosQueryOptions,
} from "../queries/todos";
import { CenteredLayout } from "../components/centered-layout";
import { dateFullFormatter } from "../lib/utils";
import { deleteTodo } from "../api/todos";
import { Button } from "../components/button";
import { TrashIcon } from "@heroicons/react/16/solid";

export function TodoPage() {
  const { todoId } = useParams<"todoId">();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const todoQuery = useQuery(getTodoByIdQueryOptions(todoId!));
  const deleteTodoMutation = useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId),
    onSuccess: () => {
      queryClient.refetchQueries(getTodosQueryOptions);
      navigate("/");
    },
  });

  const handleTodoDelete = () => deleteTodoMutation.mutate(parseInt(todoId!));

  if (todoQuery.isLoading) {
    return <p>Todo loading ...</p>;
  }

  if (todoQuery.error) {
    return <p>Ooops.. an error has happened</p>;
  }

  return (
    <CenteredLayout className="flex flex-col gap-8">
      {todoQuery.data && (
        <>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl text-neutral-800">{todoQuery.data.title}</h1>
            <p className="text-neutral-500 text-sm">
              Created at{" "}
              {dateFullFormatter.format(new Date(todoQuery.data.createdAt))}
            </p>
          </div>
          <div>
            <p className="text-neutral-400">Description</p>
            <p className="text-neutral-800">{todoQuery.data.description}</p>
          </div>
          <div className="flex justify-end w-full">
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
