import logo from "./assets/logo.jpg";
import { ArtistTable } from "./components/ArtistTable";
import "./App.css";
import { artistsWithAlbums } from "./utils/utils";
import { useState } from "react";
import { AlbumDisplay } from "./components/AlbumDisplay";

const artists = artistsWithAlbums();
export const App = () => {
  const [displayedArtist, setDisplayedArtist] = useState(undefined);

  return (
    <>
      <header>
        <nav>
          <a href={"/"}>
            <img
              src={logo}
              alt="logo"
              height="70"
              style={{ borderRadius: "50%" }}
            />
          </a>
          <ul>
            <li>
              <a href="/search">search</a>
            </li>
            <li>
              <a href="/favorites">see favorites</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {displayedArtist && (
          <div>
            <AlbumDisplay
              artist={displayedArtist}
              albums={
                artists.find((a) => a.name === displayedArtist)?.albums ?? []
              }
            />
            <button onClick={() => setDisplayedArtist(undefined)}>Close</button>
          </div>
        )}
        <ArtistTable
          artists={artists}
          onDisplay={(name) => setDisplayedArtist(name)}
        />
      </main>
    </>
  );
};
