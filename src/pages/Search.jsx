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
      <section>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>
              Search an artist
              <input
                type="text"
                placeholder="aerosmith"
                defaultValue={searchParams.get("query") ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  searchParams.set("query", value);
                  setSearchParams(searchParams);
                }}
              />
            </h1>
          </div>
          {state === "loading" ? (
            <span className="loader" />
          ) : artists.length > 0 ? (
            <ArtistTable artists={artists} />
          ) : (
            "No results to display yet"
          )}

          {creating ? (
            <ArtistCreationForm close={() => setCreating(false)} />
          ) : (
            <div>
              <button onClick={() => setCreating(true)}>Add an artist</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
