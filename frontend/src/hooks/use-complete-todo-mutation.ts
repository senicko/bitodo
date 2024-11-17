import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodosQueryOptions } from "../queries/todos";
import { Todo, updateTodo } from "../api/todos";

/** Mutation for todo complete action. */
export function useCompleteTodoMutation(todoId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (completed: boolean) => updateTodo(todoId, { completed }),
    onMutate: (completed) => {
      const prevQueries = queryClient.getQueryData<Array<Todo>>(["todos"]);

      queryClient.setQueryData<Array<Todo>>(["todos"], (oldTodos) =>
        oldTodos?.map((t) => (t.id === todoId ? { ...t, completed } : t)),
      );

      return { prevQueries };
    },
    onError: (_err, _variables, context) =>
      queryClient.setQueryData(["todos"], context?.prevQueries),
    onSettled: () => queryClient.invalidateQueries(getTodosQueryOptions),
  });
}
