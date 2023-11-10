import "react";
import { useParams } from "react-router-dom";
import { artistsWithAlbums } from "../utils/utils";
import { Cover } from "../components/Cover";

export function Artist() {
  let { artistId } = useParams();
  const numberId = Number(artistId);
  const artist = artistsWithAlbums.find(({ id }) => id === numberId);

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
        {artist.albums.map(({ Title }) => (
          <div key={Title}>
            <h2>{Title}</h2>
            <Cover
              key={Title}
              album={Title}
              artist={artist.name}
              size="medium"
            />
          </div>
        ))}
      </div>
    </>
  );
}
