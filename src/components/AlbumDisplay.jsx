import { useEffect, useState } from "react";
import { fetchCoverImage } from "../utils/utils";

export function AlbumDisplay({ artist, albums }) {
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
        console.log("url", url);
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
      return (
        <div>
          <h2>{name}</h2>
          <img src={loadStatus.url} />
        </div>
      );
    }
    case "failed": {
      return <div>Failed to load cover</div>;
    }
  }
}
