import React, { useState } from "react";

import logo from './assets/logo.jpg'
import { ArtistTable } from "./components/ArtistTable";
import { ArtistDetail } from "./components/ArtistDetail";
import { artistsWithAlbums } from './utils/utils.js';

export const App = () => {

    const [artist, setArtist] = useState();

    const [filter, setFilter] = useState();

    return <>
        <header>
            <nav>
                <a href={'/'}>
                    <img src={logo} alt="logo" height="70" style={{ borderRadius: '50%'}} />
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
            {artist && <ArtistDetail artist={artist} />}
            <input placeholder="Filtrez" onChange={e => {
                setFilter(e.target.value);
            }} />
            <ArtistTable artists={filter && artistsWithAlbums.filter(a => a.name.startsWith(filter)) || artistsWithAlbums} onArtistSelection={value => setArtist(value)}/>
            
        </main>
    </>
}