export const shortAddress = (addr = "", head = 6, tail = 4) =>
  addr && addr.length > head + tail ? `${addr.slice(0, head)}…${addr.slice(-tail)}` : addr;

export const timeAgo = (unixSeconds, now = Date.now()) => {
  const diff = Math.max(0, Math.floor(now / 1000 - unixSeconds));
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`;
  return new Date(unixSeconds * 1000).toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

// deterministic hue from any string, used for avatar gradients
export const hueFrom = (text = "") => {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 360;
  return h;
};
