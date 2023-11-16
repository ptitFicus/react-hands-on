import { ArtistTable } from "../components/ArtistTable";

import { artistsWithAlbums } from "../utils/utils"; 


export function Search() {

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ArtistTable artists={artistsWithAlbums} />
      </div>
    </section>
  );
}