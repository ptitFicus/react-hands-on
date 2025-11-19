import logo from "./assets/logo.jpg";
import { artistsWithAlbums } from "./utils/utils.js";
import "./App.css";

const makeHeader = () => {
  const header = document.createElement("header");

  const nav = document.createElement("nav");

  const basePath = document.createElement("a");
  basePath.href = "/";
  basePath.innerHTML = `<img src=${logo} height="70" style="border-radius:50%;" />`;
  nav.appendChild(basePath);

  const menuList = document.createElement("ul");
  const search = document.createElement("li");
  search.innerHTML = `<a href="/search">search</a>`;

  const fav = document.createElement("li");
  fav.innerHTML = `<a href="/favorites">see favorites</a>`;

  menuList.appendChild(search);
  menuList.appendChild(fav);

  nav.appendChild(menuList);

  header.appendChild(nav);

  return header;
};

const rootDiv = document.getElementById("root");
const main = document.createElement("main");
rootDiv.appendChild(makeHeader());

// Solution simple, pour la fonction générique demandée par le bonus, voir ci-dessous

const artists = artistsWithAlbums();
const table = document.createElement("table");

// Table header
const header = document.createElement("thead");
const headerRow = document.createElement("tr");

const artistHeader = document.createElement("th");
artistHeader.innerText = "Artists";
headerRow.appendChild(artistHeader);

const albumCountHeader = document.createElement("th");
albumCountHeader.innerText = `Album count`;
headerRow.appendChild(albumCountHeader);

header.appendChild(headerRow);
table.appendChild(header);

// Table body
const tbody = document.createElement("tbody");
artists.forEach(({ name, albums }) => {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = name;
  row.appendChild(nameCell);

  const countCell = document.createElement("td");
  countCell.textContent = albums.length === 0 ? "No albums" : albums.length;
  row.appendChild(countCell);

  tbody.appendChild(row);
});

table.appendChild(tbody);
main.appendChild(table);

/*const makeTable = (data, columns = []) => {
  const table = document.createElement("table");
  const head = document.createElement("thead");
  const trHead = document.createElement("tr");

  columns.forEach(({ header }) => {
    const tdHead = document.createElement("td");
    tdHead.innerText = header;
    trHead.appendChild(tdHead);
  });

  head.appendChild(trHead);
  table.appendChild(head);

  data.forEach((artist) => {
    const tr = document.createElement("tr");
    columns.forEach(({ source }) => {
      const td = document.createElement("td");
      td.innerText = artist[source];
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  return table;
};

const artistsWithCount = artistsWithAlbums().map(({ name, albums }) => ({
  name,
  albumCount: albums.length === 0 ? "No albums" : albums.length,
}));

console.log("artistsWithCount", artistsWithCount);

main.appendChild(
  makeTable(artistsWithCount, [
    { source: "name", header: "Artists" },
    { source: "albumCount", header: "Album count" },
  ])
);*/

rootDiv.appendChild(main);
