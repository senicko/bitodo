import { queryOptions } from "@tanstack/react-query";
import { Todo } from "../types/api";

export const todosQueryOptions = queryOptions({
  queryKey: ["todos"],
  queryFn: queryTodos,
});

async function queryTodos() {
  const res = await fetch("http://localhost:3000/todos");
  return (await res.json()) as Array<Todo>;
}
