import { artistsWithAlbums } from "../utils/utils.js";

export const ArtistTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <td>Artist ({artistsWithAlbums.length})</td>
          <td>Albums</td>
        </tr>
      </thead>
      <tbody>
        {artistsWithAlbums?.map((artist) => (
          <tr key={artist.name}>
            <td>{artist.name}</td>
            <td>{artist.albums.length ? artist.albums.length : "No Albums"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
