import { TodoList } from "../components/todo-list";

export function Dashboard() {
  return (
    <main className="p-32 w-screen flex justify-center">
      <TodoList />
    </main>
  );
}
