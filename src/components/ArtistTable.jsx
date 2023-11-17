import { shape, arrayOf, string, array, func } from "prop-types";

export const ArtistTable = ({ artists, onArtistSelection }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Artist ({artists.length})</td>
          <td>Albums</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {artists?.map((artist) => (
          <tr key={artist.name}>
            <td>{artist.name}</td>
            <td>{artist.albums.length ? artist.albums.length : "No Albums"}</td>
            <td>
              <button onClick={() => onArtistSelection(artist)}>Détails</button>
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
      name: string,
      albums: array,
    })
  ),
  onArtistSelection: func,
};
