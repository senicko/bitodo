import { Link } from "react-router-dom";
import { TodoList } from "../components/todo-list";
import { PlusIcon } from "@heroicons/react/16/solid";
import { CenteredLayout } from "../components/ui/centered-layout";
import { useQuery } from "@tanstack/react-query";
import { getTodosQueryOptions } from "../queries/todos";
import { useErrorAlert } from "../hooks/use-error-alert";

export function TodosPage() {
  const todosQuery = useQuery(getTodosQueryOptions);
  useErrorAlert(todosQuery.error);

  return (
    <CenteredLayout className="flex flex-col gap-2">
      <div className="flex justify-end">
        <Link
          to="/new"
          className="p-2 rounded-md bg-neutral-900 w-fit text-white flex items-center gap-1"
        >
          Add Todo
          <PlusIcon className="size-4 text-white" />
        </Link>
      </div>
      <div className="flex gap-2 justify-center">
        {todosQuery.data && todosQuery.data.length === 0 && (
          <p className="text-neutral-500">You don't have any todos yet!</p>
        )}

        {todosQuery.data && todosQuery.data.length > 0 && (
          <TodoList todos={todosQuery.data} />
        )}
      </div>
    </CenteredLayout>
  );
}
