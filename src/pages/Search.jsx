import { useState } from "react";
import { ArtistCreationForm } from "../components/ArtistCreationForm";
import { ArtistTable } from "../components/ArtistTable";
import {
  useSearchParams,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

export function Search() {
  let [searchParams, setSearchParams] = useSearchParams();
  const artists = useLoaderData();
  const [creating, setCreating] = useState(false);
  const { state } = useNavigation();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <label>
          Search an artist
          <input
            type="text"
            defaultValue={searchParams.get("query") ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              searchParams.set("query", value);
              setSearchParams(searchParams);
            }}
          />
        </label>
      </div>
      {state === "loading" ? (
        <span className="loader" />
      ) : artists.length > 0 ? (
        <ArtistTable artists={artists} />
      ) : (
        "No results to display yet"
      )}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => setCreating(true)}>Add an artist</button>
      </div>
      {creating && <ArtistCreationForm close={() => setCreating(false)} />}
    </>
  );
}
