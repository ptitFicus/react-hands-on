import { useState } from "react";
import { ArtistTable } from "../components/ArtistTable";

import { artistsWithAlbums } from "../utils/utils";

export function Search() {
  const [filter, setFilter] = useState();
  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <input
          placeholder="Filtrez"
          onChange={(e) => {
            setFilter(e.target.value.toUpperCase());
          }}
        />
        <ArtistTable
          artists={
            (filter &&
              artistsWithAlbums().filter((a) =>
                a.name.toUpperCase().includes(filter)
              )) ||
            artistsWithAlbums()
          }
        />
      </div>
    </section>
  );
}
