import { string, arrayOf, shape } from "prop-types";
import { Link } from "react-router-dom";

export const ArtistTable = ({ artists }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Artist ({artists.length})</td>
          <td>Nombre d'albums</td>
        </tr>
      </thead>
      <tbody>
        {artists?.map((a) => (
          <tr key={a.name}>
            <th>
              <Link to={`/artist/${encodeURIComponent(a.name)}`}>{a.name}</Link>
            </th>
            <td>{a.albums.length > 0 ? a.albums.length : "No albums"}</td>
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
