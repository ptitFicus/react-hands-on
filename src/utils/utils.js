import artists from "./data/Artist.json";
import albums from "./data/Album.json";

export function search(text) {
  const upper = text?.toUpperCase();
  return new Promise((resolve, reject) => {
    const res = artistsWithAlbums.filter(({ name }) =>
      name.toUpperCase().includes(upper)
    );
    setTimeout(() => {
      if (res.length === 0) {
        reject(new Error("No result for this search, try something else !"));
      }
      resolve(res);
    }, 1000);
  });
}

export const artistsWithAlbums = artists.map(({ ArtistId, Name }) => {
  const artistAlbums = albums.filter((al) => al.ArtistId === ArtistId);
  return { id: ArtistId, name: Name, albums: artistAlbums };
});
