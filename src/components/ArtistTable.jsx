import { shape, arrayOf, string, array, func } from "prop-types";

export function ArtistTable({ artists, onDisplay }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Artist ({artists.length})</th>
          <th colSpan={2}>Albums</th>
        </tr>
      </thead>
      <tbody>
        {artists.map(({ name, albums }) => {
          return (
            <tr key={name}>
              <td>{name}</td>
              <td>{albums.length === 0 ? "No albums" : albums.length}</td>
              <td>
                <button onClick={() => onDisplay(name)}>Display</button>
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
      name: string,
      albums: array,
    })
  ),
  onArtistSelection: func,
};
