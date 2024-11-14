import { useId } from "react";
import { Todo } from "../types/api";

export type TodoListItemProps = {
  todo: Todo;
  /** Callback called on todo complete. */
  onComplete: () => void;
  /** Calback called on todo delete. */
  onDelete: () => void;
};

export function TodoListItem({ todo }: TodoListItemProps) {
  const id = useId();

  return (
    <label htmlFor={id}>
      <div className="flex gap-4 py-2 px-4 border rounded-sm border-neutral-200">
        <div className="flex gap-2">
          <input id={id} type="checkbox" />
        </div>
        <div className="flex flex-col">
          <p className="text-neutral-900">{todo.title}</p>
          <p className="text-neutral-400 text-sm">{todo.description}</p>
        </div>
      </div>
    </label>
  );
}
