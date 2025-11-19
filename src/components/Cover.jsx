import { useEffect, useState } from "react";
import { fetchCoverImage } from "../utils/utils";

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

  switch (loadStatus.status) {
    case "loading": {
      return <div className="loader" />;
    }
    case "loaded": {
      return <img src={loadStatus.url} />;
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
