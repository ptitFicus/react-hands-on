import { useParams } from "react-router-dom";
import { AlbumDisplay } from "../components/AlbumDisplay";
import { artistsWithAlbums } from "../utils/utils";

const artists = artistsWithAlbums();
export function Artist() {
  const { name } = useParams();
  const { name: artistName, albums } = artists.find((a) => a.name === name);

  return <AlbumDisplay artist={artistName} albums={albums} />;
}
