import logo from "./assets/logo.jpg";
import "./App.css";
import { Artist } from "./pages/Artist";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { Artists } from "./pages/Artists";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FavoriteContext } from "./FavoriteContext";
import { Favorites } from "./pages/Favorites";

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
        path: "/favorites",
        element: <Favorites />,
        errorElement: <div>Failed to load favorites</div>,
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
