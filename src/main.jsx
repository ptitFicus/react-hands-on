import logo from "./assets/logo.jpg";
import artist from "./utils/data/Artist.json";
import { artistsWithAlbums } from "./utils/utils";

const rootDiv = document.getElementById("root");

const main = document.createElement("main");

const artists = artistsWithAlbums(artist);

const table = document.createElement("table");

// Table header
const header = document.createElement("thead");
const headerRow = document.createElement("tr");

const artistHeader = document.createElement("th");
artistHeader.innerText = "Artists";
headerRow.appendChild(artistHeader);

const albumCountHeader = document.createElement("th");
albumCountHeader.innerText = `Album count`;
headerRow.append(albumCountHeader);

header.appendChild(headerRow);
table.appendChild(header);

// Table body

// À VOUS DE JOUER :)

main.appendChild(table);
rootDiv.appendChild(main);
