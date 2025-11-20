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
    <>
      <h2>Search an artist</h2>
      <input
        defaultValue={searchParams.get("query")}
        type="text"
        onChange={(e) => {
          searchParams.set("query", e?.target?.value);
          setSearchParams(searchParams);
        }}
      />

      {state === "loading" ? (
        <div className="loader" />
      ) : artists.length === 0 ? (
        "No artist to display"
      ) : (
        <ArtistTable artists={artists} />
      )}
      {}
    </>
  );
}
