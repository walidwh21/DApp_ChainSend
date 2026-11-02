import { useEffect, useState } from "react";
import { config } from "../lib/config";

const cache = new Map();

/** Optional GIF preview for a tag. Returns "" when no key is configured. */
export function useGif(tag) {
  const [url, setUrl] = useState(cache.get(tag) || "");

  useEffect(() => {
    if (!config.giphyKey || !tag || cache.has(tag)) return;
    let cancelled = false;
    const q = encodeURIComponent(tag.trim());
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${config.giphyKey}&q=${q}&limit=1`)
      .then((r) => r.json())
      .then(({ data }) => {
        const found = data?.[0]?.images?.downsized_medium?.url || "";
        cache.set(tag, found);
        if (!cancelled) setUrl(found);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [tag]);

  return url;
}
