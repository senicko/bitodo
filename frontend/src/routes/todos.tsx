import { Link } from "react-router-dom";
import { TodoList } from "../components/todo-list";
import { PlusIcon } from "@heroicons/react/16/solid";
import { CenteredLayout } from "../components/centered-layout";
import { useQuery } from "@tanstack/react-query";
import { getTodosQueryOptions } from "../queries/todos";

export function TodosPage() {
  const todosQuery = useQuery(getTodosQueryOptions);

  return (
    <CenteredLayout className="flex flex-col gap-16">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Todos</h1>
        <Link
          to="/new"
          className="p-2 rounded-md bg-neutral-900 w-fit text-white flex items-center gap-1"
        >
          Add Todo
          <PlusIcon className="size-4 text-white" />
        </Link>
      </header>
      <div className="flex flex-col gap-2 items-end">
        {todosQuery.data && todosQuery.data.length === 0 && (
          <p className="text-neutral-500">You don't have any todos yet!</p>
        )}
        {todosQuery.data && (
          <TodoList todos={todosQuery.data} className="w-full" />
        )}
      </div>
    </CenteredLayout>
  );
}
