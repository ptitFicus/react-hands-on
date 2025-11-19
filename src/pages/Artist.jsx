import { useParams } from "react-router-dom";
import { ArtistDetails } from "../components/ArtistDetails";
import { artistsWithAlbums } from "../utils/utils";

const artists = artistsWithAlbums();
export function Artist() {
  const { name } = useParams();
  const { name: artistName, albums } = artists.find((a) => a.name === name);

  return <ArtistDetails artist={artistName} albums={albums} />;
}
