import { shape, arrayOf, string, array, func } from "prop-types";
import { Link } from "react-router-dom";
import { Cover } from "./Cover";

export function ArtistTable({ artists }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Artist ({artists.length})</th>
          <th>Nombre d'albums</th>
          <th>Albums</th>
        </tr>
      </thead>
      <tbody>
        {artists.map(({ name, albums }) => {
          return (
            <tr key={name}>
              <td>
                <Link to={`/artists/${encodeURIComponent(name)}`}>{name}</Link>
              </td>
              <td>{albums.length === 0 ? "No albums" : albums.length}</td>
              <td>
                <div
                  style={{
                    maxWidth: "400px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {albums.map((a) => (
                    <Cover key={a} artist={name} album={a} size="small" />
                  ))}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

ArtistTable.propTypes = {
  artists: arrayOf(
    shape({
      name: string.isRequired,
      albums: arrayOf(string),
    })
  ).isRequired,
};
