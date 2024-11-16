import { TodoListItem } from "./todo-list-item";
import { cn } from "../lib/utils";
import { Todo } from "../api/todos";

type TodoListProps = {
  todos: Array<Todo>;
  className?: string;
};

export function TodoList({ todos, className }: TodoListProps) {
  return (
    <div className={cn("flex flex-col gap-2 items-end", className)}>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onComplete={function (): void {
            throw new Error("Function not implemented.");
          }}
          onArchive={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ))}
    </div>
  );
}
