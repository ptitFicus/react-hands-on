import { useState, useEffect } from "react";
import { string, oneOf } from "prop-types";
import { fetchCoverImage } from "../utils/utils";

export function Cover({ artist, album, size }) {
  const [url, setUrl] = useState(undefined);
  const [error, setError] = useState();
  useEffect(() => {
    setError(undefined);
    fetchCoverImage(artist, album, size)
      .then((url) => setUrl(url))
      .catch((err) => setError(err.message));
  }, [artist, album, size]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return url ? <img src={url} title={album} /> : <span className="loader" />;
}
Cover.propTypes = {
  artist: string.isRequired,
  album: string.isRequired,
  size: oneOf(["small", "medium"]),
};
