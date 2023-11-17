import "react";
import { useParams } from "react-router-dom";
import { artistsWithAlbums } from "../utils/utils";

export function Artist() {
  let { artistId } = useParams();
  const decoded = decodeURIComponent(artistId);
  const artist = artistsWithAlbums().find(({ name }) => name === decoded);

  return (
    <>
      <div>
        <h1>{artist.name}</h1>
        <h2>Albums</h2>
        <ul>
          {artist.albums.map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
