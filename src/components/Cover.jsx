import { useState, useEffect } from "react";
import { string } from "prop-types";

export function Cover({ artist, album }) {
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    albumArt(artist, { album: album }).then((url) => setUrl(url));
  }, [artist, album]);

  return url ? <img src={url} title={album} /> : <span className="loader" />;
}
Cover.propTypes = {
  artist: string.isRequired,
  album: string.isRequired,
};
