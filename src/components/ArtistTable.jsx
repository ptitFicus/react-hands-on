import { string, arrayOf, shape } from "prop-types";
import { Link } from "react-router-dom";
import { Cover } from "../components/Cover";

export function ArtistTable({ artists }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <td>Album count</td>
            <td>Covers</td>
          </tr>
        </thead>
        <tbody>
          {artists.map((a) => (
            <tr key={a.name}>
              <th>
                <Link to={`/artist/${encodeURIComponent(a.name)}`}>
                  {a.name}
                </Link>
              </th>
              <td>{a.albums.length}</td>
              <td>
                {a.albums.map((title) => (
                  <Cover
                    key={`${a.name}-${title}`}
                    artist={a.name}
                    album={title}
                    size="small"
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
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
