import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { NewPage } from "./routes/new";
import { TodoPage } from "./routes/todo";
import { TodosPage } from "./routes/todos";

const queryClient = new QueryClient();

const browserRouter = createBrowserRouter([
  { path: "/", element: <TodosPage /> },
  { path: "/:todoId", element: <TodoPage /> },
  { path: "/new", element: <NewPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={browserRouter} />
    </QueryClientProvider>
  </StrictMode>
);
