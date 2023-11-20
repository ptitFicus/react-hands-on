import { string, arrayOf, shape } from "prop-types";
import { Link } from "react-router-dom";
import { Cover } from "./Cover";

export const ArtistTable = ({ artists }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Artist ({artists.length})</td>
          <td>Nombre d'albums</td>
          <td>Albums</td>
        </tr>
      </thead>
      <tbody>
        {artists?.map((a) => (
          <tr key={a.name}>
            <th>
              <Link to={`/artist/${encodeURIComponent(a.name)}`}>{a.name}</Link>
            </th>
            <td>{a.albums.length > 0 ? a.albums.length : "No albums"}</td>
            <td>
              <ul>
                {a.albums.map((title) => (
                  <Cover
                    key={`${a.name}-${title}`}
                    artist={a.name}
                    album={title}
                    size="small"
                  />
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ArtistTable.propTypes = {
  artists: arrayOf(
    shape({
      name: string.isRequired,
      albums: arrayOf(string),
    })
  ).isRequired,
};
