export function AlbumDisplay({ artist, albums }) {
  return (
    <div>
      <h1>{artist}</h1>
      <h2>Albums</h2>
      {albums.length === 0 ? (
        <>No album found for {artist}</>
      ) : (
        <ul>
          {albums.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
