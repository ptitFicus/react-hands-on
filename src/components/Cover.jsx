import { useState, useEffect, useContext } from "react";
import { string, oneOf } from "prop-types";
import { FavoriteContext } from "../FavoriteContext";

export function Cover({ artist, album, size }) {
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    albumArt(artist, { album: album, size: size }).then((url) => setUrl(url));
  }, [artist, album, size]);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoriteContext);
  const isFavorite = Boolean(
    favorites.find(
      ({ artist: fartist, album: falbum }) =>
        fartist === artist && falbum === album
    )
  );

  return url ? (
    <div
      className={`star ${isFavorite ? "active" : ""}`}
      onClick={() => {
        if (isFavorite) {
          removeFavorite({ artist, album });
        } else {
          addFavorite({ artist, album });
        }
      }}
    >
      <img src={url} title={album} />
    </div>
  ) : (
    <span className="loader" />
  );
}
Cover.propTypes = {
  artist: string.isRequired,
  album: string.isRequired,
  size: oneOf(["small", "medium"]).isRequired,
};
