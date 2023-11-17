import { string, arrayOf, shape } from "prop-types";

export const ArtistDetail = ({ artist }) => {
  return (
    <div>
      <h1>{artist.name}</h1>
      <h2>Albums</h2>
      <ul>
        {artist.albums.map((title) => (
          <li key={title}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

ArtistDetail.propTypes = {
  artist: shape({
    name: String,
    albums: arrayOf(
      shape({
        title: string,
      })
    ),
  }),
};
