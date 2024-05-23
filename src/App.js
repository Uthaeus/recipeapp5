import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/layouts/root-layout";
import Home from "./pages/home";
import About from "./pages/about";

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
      }
    ]
  }
]);


function App() {
  return <RouterProvider router={router} />
}

export default App;
