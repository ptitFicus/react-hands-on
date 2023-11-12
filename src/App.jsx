import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Search } from "./pages/Search";
import { Artist } from "./pages/Artist";
import { useEffect, useState } from "react";
import { FavoriteContext } from "./FavoriteContext";
import { search } from "./utils/utils";

const router = createBrowserRouter([
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

export default App;
