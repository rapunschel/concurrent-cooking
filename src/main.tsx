import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import Recipe, { loader as recipeLoader } from "./routes/recipe";
import Home from "./routes/home";
import Top, { loader as topLoader } from "./components/top/Top.js";
import "./style.css";
import { NavBar } from "./components/NavBar.js";
import ErrorPage from "./ErrorPage.js";

const router = createHashRouter([
  {
    path: "/intro",
    element: (
      <div>
        <NavBar />
        <h1>About</h1>
      </div>
    ),
  },
  {
    path: "/docs",
    element: (
      <div>
        <NavBar />
        <h1>Docs</h1>
      </div>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/top" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/top",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="all" replace />,
      },

      {
        path: ":tagId",
        element: <Top />,
        loader: topLoader,
      },
    ],
  },

  {
    path: "/top/recipes/:user/:recipeId",
    element: <Recipe />,
    errorElement: <ErrorPage />,
    loader: recipeLoader,
  },
]);

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
