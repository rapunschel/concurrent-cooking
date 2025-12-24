import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Recipe from "./routes/recipe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World.</div>,
  },
  { path: "/recipes/:recipe", element: <Recipe /> },
]);
const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
