import { useState } from "react";
import { CategoriesSidebar } from "../components/categories-sidebar";
import { TodoList } from "../components/todo-list";

export function Dashboard() {
  const [categories] = useState(["Todo", "Groceries", "Holidays", "School"]);

  return (
    <main className="w-screen h-screen flex">
      <CategoriesSidebar categories={categories} />
      <div className="p-4 grow flex justify-center">
        <TodoList />
      </div>
    </main>
  );
}
