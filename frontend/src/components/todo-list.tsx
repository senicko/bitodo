import { TodoListItem } from "./todo-list-item";
import { Todo } from "../api/todos";

type TodoListProps = {
  todos: Array<Todo>;
};

export function TodoList({ todos }: TodoListProps) {
  return (
    <div className="flex flex-col gap-2 items-end w-full">
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
