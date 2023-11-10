import { string, arrayOf, shape, number } from "prop-types";
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
            <tr key={a.id}>
              <th>
                <Link to={`/artist/${a.id}`}>{a.name}</Link>
              </th>
              <td>{a.albums.length}</td>
              <td>
                {a.albums.map(({ Title }) => (
                  <Cover
                    key={`${a.id}-${Title}`}
                    artist={a.name}
                    album={Title}
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
      id: number.isRequired,
      albums: arrayOf(
        shape({
          Title: string.isRequired,
        })
      ),
    })
  ).isRequired,
};
