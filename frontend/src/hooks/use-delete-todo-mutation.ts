import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../api/todos";
import {
  getTodoByIdQueryOptions,
  getTodosQueryOptions,
} from "../queries/todos";

type UseDeleteTodoMutationOptions = {
  onSuccess?: () => void;
};

export function useDeleteTodoMutation({
  onSuccess,
}: UseDeleteTodoMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId),
    onSuccess: async (_, todoId) => {
      queryClient.removeQueries(getTodoByIdQueryOptions(todoId));
      await queryClient.refetchQueries(getTodosQueryOptions);
      onSuccess?.();
    },
  });
}
