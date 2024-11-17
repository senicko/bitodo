import { queryOptions } from "@tanstack/react-query";
import { getTodoById, getTodos } from "../api/todos";

export const getTodosQueryOptions = queryOptions({
  queryKey: ["todos"],
  queryFn: getTodos,
});

export const getTodoByIdQueryOptions = (todoId: number) =>
  queryOptions({
    queryKey: ["todos", todoId],
    queryFn: () => getTodoById(todoId),
  });
