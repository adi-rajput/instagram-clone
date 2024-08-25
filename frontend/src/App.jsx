import Signup from "./components/Signup";
import Login from "./components/login";
import { createBrowserRoot } from "react-dom";
import { RouterProvider } from "react-router";

const browserRouter = createBrowserRoot([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
      <RouterProvider />
    </>
  );
}

export default App;
