import React from "react";

export function ArtistTable({ artists }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Artist ({artists.length})</th>
          <th>Albums</th>
        </tr>
      </thead>
      <tbody>
        {artists.map(({ name, albums }) => {
          return (
            <tr key={name}>
              <td>{name}</td>
              <td>{albums.length === 0 ? "No albums" : albums.length}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
