import { useState, useEffect, useContext } from "react";
import { string, oneOf } from "prop-types";

export function Cover({ artist, album, size }) {
    const [url, setUrl] = useState(undefined);
    useEffect(() => {
        albumArt(artist, { album: album, size: size }).then((url) => setUrl(url));
    }, [artist, album, size]);

    return url ? (
                    <img src={url} title={album} />
    ) : (
        <span className="loader" />
    );
}
Cover.propTypes = {
    artist: string.isRequired,
    album: string.isRequired,
    size: oneOf(["small", "medium"]).isRequired,
};