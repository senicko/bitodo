import { useMemo } from "react";
import { TodoListItem } from "./todo-list-item";
import { useQuery } from "@tanstack/react-query";
import { todosQueryOptions } from "../hooks/use-todos";

export function TodoList() {
  const todosQuery = useQuery(todosQueryOptions);

  /** Completes the todo with the given ID */
  const handleTodoComplete = (id: string) => {
    console.log("completed todo", id);
    // setTodos(
    //   todos.map((todo) => (todo.id === id ? { ...todo, done: true } : todo))
    // );
  };

  const handleTodoDelete = (id: string) => {
    console.log("deleted todo", id);
    // setTodos(todos.filter((todo) => todo.id !== id));
  };

  // not archived todos
  const currentTodos = useMemo(
    () =>
      todosQuery.data ? todosQuery.data.filter((todo) => !todo.archived) : [],
    [todosQuery.data]
  );

  if (todosQuery.isLoading) {
    return (
      <div>
        <p>Todos are loading ...</p>
      </div>
    );
  }

  if (todosQuery.error) {
    return (
      <div>
        <p>Failed to fetch todos ...</p>
      </div>
    );
  }

  return (
    <div className="w-[512px]">
      {currentTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onComplete={() => handleTodoComplete(todo.id)}
          onDelete={() => handleTodoDelete(todo.id)}
        />
      ))}
    </div>
  );
}
