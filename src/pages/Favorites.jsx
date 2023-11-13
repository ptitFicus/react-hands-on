import { useContext } from "react";
import { FavoriteContext } from "../FavoriteContext";
import { Link } from "react-router-dom";
import { Cover } from "../components/Cover";

export function Favorites() {
  const { favorites } = useContext(FavoriteContext);

  return (
    <section>
      <div>
        <h1>Favorites</h1>
        {favorites.length === 0 ? (
          "No favorites yet, click on an album to add one."
        ) : (
          <table>
            <thead>
              <tr>
                <th>Artist</th>
                <td>Album</td>
              </tr>
            </thead>
            <tbody>
              {favorites.map(({ artist, album }) => (
                <tr key={artist}>
                  <th>
                    <Link to={`/artist/${encodeURIComponent(artist)}`}>
                      {artist}
                    </Link>
                  </th>
                  <td>
                    <Cover artist={artist} album={album} size="small" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
