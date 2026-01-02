import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Recipe, { loader as recipeLoader } from "./routes/recipe";
import Home, { loader as homeLoader } from "./routes/home";
import "./style.css";

const router = createBrowserRouter([
  {
    path: "/concurrent-cooking",
    element: <Home />,
  },
  {
    path: "/concurrent-cooking/:tagId",
    element: <Home />,
    loader: homeLoader,
  },

  {
    path: "/concurrent-cooking/recipes/:recipeId",
    element: <Recipe />,
    loader: recipeLoader,
  },
]);
const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
