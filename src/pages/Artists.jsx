import { artistsWithAlbums } from "../utils/utils";
import { ArtistTable } from "../components/ArtistTable";

const artists = artistsWithAlbums();

export function Artists() {
  return (
    <>
      <ArtistTable artists={artists} />
    </>
  );
}
