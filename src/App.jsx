import "./App.css";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  Link,
} from "react-router-dom";

import { search } from "./utils/utils";
import logo from "./assets/logo.jpg";
import { Search } from "./pages/Search";
import { Artist } from "./pages/Artist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Search />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const query = url.searchParams.get("query");

          return search(query);
        },
      },
      { path: "/artist/:artistId", element: <Artist /> },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

function Layout() {
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
