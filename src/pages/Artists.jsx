import { search } from "../utils/utils";
import { ArtistTable } from "../components/ArtistTable";
import { useState } from "react";
import { debounce } from "lodash";

export function Artists() {
  const [artistQuery, setArtistQuery] = useState({
    artists: [],
    status: "loaded",
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>
        Search an artist
        <input
          type="text"
          onChange={debounce((e) => {
            setArtistQuery({
              status: "loading",
            });
            search(e?.target?.value)
              .then((as) => setArtistQuery({ status: "loaded", artists: as }))
              .catch((err) => setArtistQuery({ status: "failed" }));
          }, 500)}
        />
      </h2>

      {artistQuery.status === "failed" ? (
        <div>Failed to search artists</div>
      ) : artistQuery.status === "loading" ? (
        <div className="loader" />
      ) : artistQuery.artists.length === 0 ? (
        "No artist to display"
      ) : (
        <ArtistTable artists={artistQuery.artists} />
      )}
      {}
    </div>
  );
}
