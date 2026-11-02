const tones = {
  warn: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  error: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  ok: "border-mint-500/30 bg-mint-500/10 text-mint-400",
};

export default function Notice({ tone = "warn", children }) {
  return <div className={`rounded-xl border px-4 py-3 text-sm ${tones[tone]}`}>{children}</div>;
}
