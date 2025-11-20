import { useEffect, useState, useContext } from "react";
import { fetchCoverImage } from "../utils/utils";
import { string, oneOf } from "prop-types";
import { FavoriteContext } from "../FavoriteContext";

export function Cover({ artist, album, size }) {
  const [loadStatus, setLoadStatus] = useState({ status: "loading" });

  useEffect(() => {
    fetchCoverImage(artist, album, size)
      .then((url) => {
        setLoadStatus({ status: "loaded", url: url });
      })
      .catch((err) => {
        setLoadStatus({ status: "failed" });
      });
  }, [artist, album]);

  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoriteContext);
  const isFavorite = Boolean(
    favorites.find(
      ({ artist: fartist, album: falbum }) =>
        fartist === artist && falbum === album
    )
  );

  switch (loadStatus.status) {
    case "loading": {
      return <div className="loader" />;
    }
    case "loaded": {
      return (
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
          <img src={loadStatus.url} />
        </div>
      );
    }
    case "failed": {
      if (size === "small") {
        return <div>❌</div>;
      } else {
        return <div>Failed to load cover</div>;
      }
    }
  }
}

Cover.propTypes = {
  artist: string.isRequired,
  album: string.isRequired,
  size: oneOf(["small", "medium"]),
};
