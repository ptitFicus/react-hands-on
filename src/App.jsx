import logo from "./assets/logo.jpg";
import "./App.css";
import { Artist } from "./pages/Artist";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { Artists } from "./pages/Artists";
import { Link } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/artists/:name",
        element: <Artist />,
        errorElement: <div>This artist does not exist</div>,
      },
      {
        path: "/",
        element: <Artists />,
      },
    ],
    errorElement: <div>Not found</div>,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export function Layout() {
  return (
    <>
      <header>
        <nav>
          <a href={"/"}>
            <img
              src={logo}
              alt="logo"
              height="70"
              style={{ borderRadius: "50%" }}
            />
          </a>
          <ul>
            <li>
              <Link to="/">search</Link>
            </li>
            <li>
              <Link to="/favorites">favorites</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
