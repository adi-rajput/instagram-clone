import Signup from "./components/Signup";
import Login from "./components/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/mainlayout";
import Home from "./components/home";
import Profile from "./components/profile";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      }
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
