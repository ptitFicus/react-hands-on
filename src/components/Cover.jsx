import { useState, useEffect } from "react";
import { string } from "prop-types";
import { fetchCoverImage } from "../utils/utils";

export function Cover({ artist, album }) {
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    fetchCoverImage(artist, album, "medium").then((url) => setUrl(url));
  }, [artist, album]);

  return url ? <img src={url} title={album} /> : <span className="loader" />;
}
Cover.propTypes = {
  artist: string.isRequired,
  album: string.isRequired,
};
