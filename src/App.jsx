import "./App.css";
import {
  createHashRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import { Search } from "./pages/Search";
import { Artist } from "./pages/Artist";
import { useEffect, useState } from "react";
import { FavoriteContext } from "./FavoriteContext";
import { search } from "./utils/utils";
import logo from "./assets/logo.jpg";
import { Favorites } from "./pages/Favorites";

const router = createHashRouter([
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
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);

function App() {
  const [favorites, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = ({ artist, album }) => {
    setFavorite((favs) => [...favs, { artist, album }]);
  };

  const removeFavorite = ({ artist, album }) => {
    setFavorite((favs) =>
      favs.filter(
        ({ artist: fartist, album: falbum }) =>
          artist !== fartist || album !== falbum
      )
    );
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites: favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      <RouterProvider router={router} />
    </FavoriteContext.Provider>
  );
}

function Layout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">
            <img src={logo} height="70" style={{ borderRadius: "50%" }} />
          </Link>
          <ul>
            <li>
              <Link to="/">search</Link>
            </li>
            <li>
              <Link to="/favorites">see favorites</Link>
            </li>
            <li>
              <a href="https://ptitficus.github.io/react-hands-on/">
                consignes
              </a>
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

export default App;
