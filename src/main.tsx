import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import Recipe, { loader as recipeLoader } from "./routes/recipe";
import Home from "./routes/home";
import Terminal, {
  loader as terminalLoader,
} from "./components/terminal/Terminal.js";

import "./style.css";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Navigate to="/all" replace />,
      },

      {
        path: "/:tagId",
        element: <Terminal />,
        loader: terminalLoader,
      },
    ],
  },

  {
    path: "recipes/:user/:recipeId",
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
