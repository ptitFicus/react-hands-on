import { Cover } from "./Cover";

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
                <Cover artist={artist} album={a} size="medium" />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
