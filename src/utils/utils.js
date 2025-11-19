import withAlbums from "./data/data.json";
import artists from "./data/Artist.json";

export function search(text) {
  const upper = text?.toUpperCase();
  return new Promise((resolve) => {
    if (!text || text?.length === 0) {
      resolve([]);
    } else {
      const res = artistsWithAlbums().filter(({ name }) =>
        name.toUpperCase().includes(upper)
      );
      setTimeout(() => {
        resolve(res);
      }, 1000);
    }
  });
}

function readAddedData() {
  const readed = localStorage.getItem("artists");
  return readed ? JSON.parse(readed) : [];
}

export function add(artist, albums) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        artistsWithAlbums().find(
          ({ name }) => name.toUpperCase() === artist?.toUpperCase()
        )
      ) {
        reject(new Error("Artist already exist"));
      } else {
        const readed = readAddedData();
        readed.push({ name: artist, albums: albums });
        localStorage.setItem("artists", JSON.stringify(readed));
        resolve({ artist, albums });
      }
    }, 2000);
  });
}

const BLACKLIST = ["The Beatles", "The Cure", "Louise Attaque"];

export const artistsWithAlbums = () => {
  const aggregation = withAlbums
    .filter(({ name }) => !BLACKLIST.includes(name))
    .reduce((acc, { name, album }) => {
      if (acc[name]) {
        acc[name].albums.push(album);
      } else {
        acc[name] = { name, albums: [album] };
      }
      return acc;
    }, {});

  artists.forEach(({ Name }) => {
    if (!aggregation[Name]) {
      aggregation[Name] = { name: Name, albums: [] };
    }
  });

  return Object.values(aggregation)
    .concat(readAddedData())
    .sort((a1, a2) => {
      if (a1.name > a2.name) {
        return 1;
      } else if (a1.name < a2.name) {
        return -1;
      } else {
        return 0;
      }
    });
};

export function fetchCoverImage(artist, album, size) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
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
    }, getRandomInt(200, 2000));
    //return albumArt(artist, { album: album, size: size ?? "large" });
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}