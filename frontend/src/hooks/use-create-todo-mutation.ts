import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, CreateTodoData } from "../api/todos";
import { ApiProblem, ValidationError } from "../api/api";
import { getTodosQueryOptions } from "../queries/todos";

type UseCreateTodoMutationOptions = {
  onValidationErros?: (validationErrors: Array<ValidationError>) => void;
  onSuccess?: () => void;
};

/** Mutation for todo create action. */
export function useCreateTodoMutation({
  onSuccess,
  onValidationErros,
}: UseCreateTodoMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createTodoData: CreateTodoData) =>
      await createTodo(createTodoData),
    onError: (err) => {
      if (err instanceof ApiProblem && err.problem.type === "validation") {
        onValidationErros?.(err.problem.validationErrors);
        return;
      }

      alert(err.message);
    },
    onSuccess: () => {
      queryClient.refetchQueries(getTodosQueryOptions);
      onSuccess?.();
    },
  });
}
