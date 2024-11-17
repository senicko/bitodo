import { processApiError } from "./api";

/** Todo type returned from API. */
export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

/** Makes an API call to fetch all todos. */
export async function getTodos(): Promise<Array<Todo>> {
  const res = await fetch("http://localhost:3000/todos");
  if (!res.ok) throw await processApiError(res);
  return await res.json();
}

/** Makes an API call to get the todo with the given id. */
export async function getTodoById(todoId: number) {
  const res = await fetch(`http://localhost:3000/todos/${todoId}`);
  if (!res.ok) throw await processApiError(res);
  return (await res.json()) as Todo;
}

export type CreateTodoData = {
  title: string;
  description: string;
};

/** Makes an API call to create a new todo. */
export async function createTodo(
  createTodoData: CreateTodoData
): Promise<Todo> {
  const res = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createTodoData),
  });

  if (!res.ok) throw await processApiError(res);

  return res.json();
}

type TodoUpdateData = Partial<{
  title: string;
  description: string;
  completed: boolean;
  archived: boolean;
}>;

/** Makes an API call to update the todo with the given id. */
export async function updateTodo(
  todoId: number,
  todoUpdateData: TodoUpdateData
) {
  const res = await fetch(`http://localhost:3000/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoUpdateData),
  });

  if (!res.ok) throw await processApiError(res);
}

/** Makes an API call to delete the todo with the given id. */
export async function deleteTodo(todoId: number) {
  const res = await fetch(`http://localhost:3000/todos/${todoId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw await processApiError(res);
}
