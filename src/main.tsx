import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import Recipe, { loader as recipeLoader } from "./routes/recipe";
import Home, { loader as homeLoader } from "./routes/home";
import Terminal, { loader as terminalLoader } from "./components/Terminal.jsx";

import "./style.css";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Terminal />,
        loader: homeLoader,
      },
      {
        path: "all",
        element: <Navigate to="/" replace />,
      },
      {
        path: "/:tagId",
        element: <Terminal />,
        loader: terminalLoader,
      },
    ],
  },

  {
    path: "recipes/:recipeId",
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
