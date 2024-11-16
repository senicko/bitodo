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
export async function getTodos() {
  const res = await fetch("http://localhost:3000/todos");
  // TODO: Error handling.
  return (await res.json()) as Array<Todo>;
}

/** Makes an API call to get the todo with the given id. */
export async function getTodoById(todoId: string) {
  const res = await fetch(`http://localhost:3000/todos/${todoId}`);
  // TODO: Error handling.
  return (await res.json()) as Todo;
}

export type CreateTodoData = {
  title: string;
  description: string;
};

/** Makes an API call to create a new todo. */
export async function createTodo(createTodoData: CreateTodoData) {
  // TODO: Error handling
  await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createTodoData),
  });
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
  // TODO: Error handling
  await fetch(`http://localhost:3000/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoUpdateData),
  });
}

/** Makes an API call to delete the todo with the given id. */
export async function deleteTodo(todoId: number) {
  await fetch(`http://localhost:3000/todos/${todoId}`, {
    method: "DELETE",
  });
}
