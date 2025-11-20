import { ArtistTable } from "../components/ArtistTable";
import {
  useSearchParams,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

export function Artists() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { state } = useNavigation();
  const artists = useLoaderData();

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
          defaultValue={searchParams.get("query")}
          type="text"
          onChange={(e) => {
            searchParams.set("query", e?.target?.value);
            setSearchParams(searchParams);
          }}
        />
      </h2>

      {state === "loading" ? (
        <div className="loader" />
      ) : artists.length === 0 ? (
        "No artist to display"
      ) : (
        <ArtistTable artists={artists} />
      )}
      {}
    </div>
  );
}
