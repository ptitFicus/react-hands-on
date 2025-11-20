import { useState } from "react";
import { add } from "../utils/utils";
import { func } from "prop-types";

export function ArtistCreationForm({ close }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const artist = e.target.artist.value;
        const albums = e.target.albums.value
          ?.split("\n")
          .filter((s) => s !== "");
        add(artist, albums)
          .then(() => {
            setLoading(false);
            close();
          })
          .catch((err) => {
            setLoading(false);
            setError(err);
          });
      }}
    >
      <label>
        Name
        <input type="text" name="artist" />
      </label>
      <label>
        Albums (one per line)
        <textarea name="albums" />
      </label>
      {error && (
        <div className="error">{error?.message ?? JSON.stringify(error)}</div>
      )}

      {loading ? (
        <div className="loader" />
      ) : (
        <>
          <button onClick={() => close()}>Cancel</button>
          <button type="submit">Add artist</button>
        </>
      )}
    </form>
  );
}
ArtistCreationForm.propTypes = {
  close: func,
};
