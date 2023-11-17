import artists from "./data/Artist.json";
import albums from "./data/Album.json";
import withAlbums from "./data/data.json";

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

const BLACKLIST = ["The Beatles", "The Cure", "Louise Attaque"];

export const artistsWithAlbums = Object.values(
  withAlbums
    .filter(({ name }) => !BLACKLIST.includes(name))
    .reduce((acc, { name, album }) => {
      if (acc[name]) {
        acc[name].albums.push(album);
      } else {
        acc[name] = { name, albums: [album] };
      }
      return acc;
    }, {})
);

export function fetchCoverImage(artist, album, size) {
  return new Promise((resolve, reject) => {
    if (
      artist.toUpperCase() === "LED ZEPPELIN" &&
      album.toUpperCase() === "PRESENCE"
    ) {
      reject(new Error(`Unknown album ${album} (${artist})`));
    } else {
      resolve(
        withAlbums.find(
          ({ name, album: candidateAlbum }) =>
            name === artist && album === candidateAlbum
        )?.[size]
      );
    }
    //return albumArt(artist, { album: album, size: size ?? "large" });
  });
}
