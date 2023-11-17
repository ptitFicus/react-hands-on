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

const makeTable = (data, columns = []) => {
  const table = document.createElement("table");
  const head = document.createElement("thead");
  const trHead = document.createElement("tr");

  columns.forEach((col) => {
    const tdHead = document.createElement("td");
    tdHead.innerText = col;
    trHead.appendChild(tdHead);
  });

  head.appendChild(trHead);
  table.appendChild(head);

  data.forEach((artist) => {
    const tr = document.createElement("tr");
    columns.forEach((col) => {
      const td = document.createElement("td");
      td.innerText = artist[col];
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  return table;
};

const main = document.createElement("main");

main.appendChild(makeTable(artistsWithAlbums(), ["name"]));

rootDiv.appendChild(makeHeader());
rootDiv.appendChild(main);
