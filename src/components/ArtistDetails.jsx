import { useEffect, useState } from "react";
import { fetchCoverImage } from "../utils/utils";

export function ArtistDetails({ artist, albums }) {
  return (
    <div>
      <h1>{artist}</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {albums.length === 0 ? (
          <>No album found for {artist}</>
        ) : (
          <>
            {albums.map((a) => (
              <div key={a}>
                <h2>{a}</h2>
                <Cover artist={artist} name={a} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function Cover({ artist, name }) {
  const [loadStatus, setLoadStatus] = useState({ status: "loading" });

  useEffect(() => {
    fetchCoverImage(artist, name, "medium")
      .then((url) => {
        setLoadStatus({ status: "loaded", url: url });
      })
      .catch((err) => {
        setLoadStatus({ status: "failed" });
      });
  }, [artist, name]);

  switch (loadStatus.status) {
    case "loading": {
      return <div className="loader" />;
    }
    case "loaded": {
      return <img src={loadStatus.url} />;
    }
    case "failed": {
      return <div>Failed to load cover</div>;
    }
  }
}
