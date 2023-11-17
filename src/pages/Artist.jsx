import "react";
import { useParams } from "react-router-dom";
import { artistsWithAlbums } from "../utils/utils";
import { Cover } from "../components/Cover";

export function Artist() {
  let { artistId } = useParams();
  const decoded = decodeURIComponent(artistId);
  const artist = artistsWithAlbums().find(({ name }) => name === decoded);

  return (
    <>
      <h1>{artist.name}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {artist.albums.map((title) => (
          <div key={title}>
            <h2>{title}</h2>
            <Cover
              key={title}
              album={title}
              artist={artist.name}
              size="medium"
            />
          </div>
        ))}
      </div>
    </>
  );
}
