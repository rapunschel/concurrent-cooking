import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Recipe, { loader as recipeLoader } from "./routes/recipe";
import Home from "./routes/home";
import Terminal, { loader as terminalLoader } from "./components/Terminal.jsx";

import "./style.css";

const router = createBrowserRouter([
  {
    path: "/concurrent-cooking",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Terminal />,
        loader: terminalLoader,
      },
      {
        path: "/concurrent-cooking/:tagId",
        element: <Terminal />,
        loader: terminalLoader,
      },
    ],
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
