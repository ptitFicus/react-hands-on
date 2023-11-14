import React from "react";

import logo from './assets/logo.jpg'
import { ArtistTable } from "./components/ArtistTable";

export const App = () => {
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
            <ArtistTable />
        </main>
    </>
}