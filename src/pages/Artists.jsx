import { search } from "../utils/utils";
import { ArtistTable } from "../components/ArtistTable";
import { useState } from "react";
import { debounce } from "lodash";
import { ArtistCreationForm } from "../components/ArtistCreationForm";

export function Artists() {
  const [artistQuery, setArtistQuery] = useState({
    artists: [],
    status: "loaded",
  });
  const [creatingArtist, setCreatingArtist] = useState(false);
  return (
    <>
      <h2>Search an artist</h2>
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

      {artistQuery.status === "failed" ? (
        <div>Failed to search artists</div>
      ) : artistQuery.status === "loading" ? (
        <div className="loader" />
      ) : artistQuery.artists.length === 0 ? (
        <div>No artist to display</div>
      ) : (
        <ArtistTable artists={artistQuery.artists} />
      )}
      <div>
        {creatingArtist ? (
          <ArtistCreationForm close={() => setCreatingArtist(false)} />
        ) : (
          <button onClick={() => setCreatingArtist(true)}>Add an artist</button>
        )}
      </div>
    </>
  );
}
