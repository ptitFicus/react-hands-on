import artists from "./data/Artist.json";
import albums from "./data/Album.json";

export function search(text) {
  const upper = text?.toUpperCase();
  return new Promise((resolve) => {
    if (!text || text?.length === 0) {
      resolve([]);
    } else {
      const res = artistsWithAlbums.filter(({ name }) =>
        name.toUpperCase().includes(upper)
      );
      setTimeout(() => {
        resolve(res);
      }, 1000);
    }
  });
}

export function add(artist, albums) {
  return new Promise((resolve, reject) => {
    if (
      artistsWithAlbums.find(
        ({ name }) => name.toUpperCase() === artist?.toUpperCase()
      )
    ) {
      reject(new Error("Artist already exist"));
    } else {
      artistsWithAlbums.push({ name: artist, albums: albums });
      localStorage.setItem("artists", JSON.stringify(artistsWithAlbums));
      resolve({ artist, albums });
    }
  });
}

export const artistsWithAlbums =
  localStorage.getItem("artists") !== null
    ? JSON.parse(localStorage.getItem("artists"))
    : artists.map(({ ArtistId, Name }) => {
        const artistAlbums = albums.filter((al) => al.ArtistId === ArtistId);
        return { name: Name, albums: artistAlbums.map(({ Title }) => Title) };
      });

export function fetchCoverImage(artist, album, size) {
  if (
    artist.toUpperCase() === "LED ZEPPELIN" &&
    album.toUpperCase() === "PRESENCE"
  ) {
    return new Promise((resolve, reject) =>
      reject(new Error(`Unknown album ${album} (${artist})`))
    );
  }
  return albumArt(artist, { album: album, size: size ?? "large" });
}
