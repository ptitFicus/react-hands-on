import React from "react";

export const ArtistDetail = ({ artist }) => {
    return <div>
        <h1>{artist.name}</h1>
        <h2>Albums</h2>
        <ul>
            {artist.albums.map((title) =>
                <li key={title}>{title}</li>
            )}
        </ul>
    </div>

};