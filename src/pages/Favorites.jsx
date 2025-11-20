import { useContext } from "react";
import { FavoriteContext } from "../FavoriteContext";
import { ArtistTable } from "../components/ArtistTable";

export function Favorites() {
  const { favorites } = useContext(FavoriteContext);

  const artists = Object.entries(
    favorites.reduce((acc, { artist, album }) => {
      if (!acc[artist]) {
        acc[artist] = [album];
      } else {
        acc[artist].push(album);
      }
      return acc;
    }, {})
  ).map(([name, albums]) => ({ name, albums }));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ArtistTable artists={artists} />
    </div>
  );
}
