import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/layouts/root-layout";
import Home from "./pages/home";
import About from "./pages/about";
import NewRecipe from "./components/recipes/new-recipe";
import EditRecipe from "./components/recipes/edit-recipe";
import RecipeDetail from "./components/recipes/recipe-detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/recipes/new",
        element: <NewRecipe />
      },
      {
        path: "/recipes/:id/edit",
        element: <EditRecipe />
      },
      {
        path: "/recipes/:id",
        element: <RecipeDetail />
      }
    ]
  }
]);


function App() {
  return <RouterProvider router={router} />
}

export default App;
