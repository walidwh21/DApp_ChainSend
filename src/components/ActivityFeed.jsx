import { FiExternalLink, FiRefreshCw } from "react-icons/fi";
import { explorerAddress } from "../lib/config";
import { hueFrom, shortAddress, timeAgo } from "../lib/format";
import { useGif } from "../hooks/useGif";
import Notice from "./Notice";
import Spinner from "./Spinner";

function Avatar({ tag }) {
  const gif = useGif(tag);
  const hue = hueFrom(tag || "none");
  if (gif) return <img src={gif} alt={tag} className="h-36 w-full rounded-xl object-cover" />;
  return (
    <div
      className="flex h-36 w-full items-center justify-center rounded-xl text-3xl font-extrabold text-white/90"
      style={{ background: `linear-gradient(135deg, hsl(${hue} 70% 45%), hsl(${(hue + 70) % 360} 70% 35%))` }}
    >
      #{tag || "transfer"}
    </div>
  );
}

function Card({ r }) {
  return (
    <article className="panel flex flex-col gap-3 p-4 transition hover:-translate-y-1 hover:border-white/20">
      <Avatar tag={r.tag} />
      <div className="flex items-baseline justify-between">
        <p className="text-xl font-bold text-white">{r.eth} <span className="text-sm font-medium text-slate-400">ETH</span></p>
        <span className="text-xs text-slate-500">{timeAgo(r.sentAt)}</span>
      </div>
      {r.note && <p className="text-sm text-slate-300">“{r.note}”</p>}
      <div className="mt-auto flex items-center gap-2 font-mono text-xs text-slate-400">
        <a className="inline-flex items-center gap-1 hover:text-mint-400" href={explorerAddress(r.from)} target="_blank" rel="noreferrer">
          {shortAddress(r.from)} <FiExternalLink />
        </a>
        <span>→</span>
        <a className="inline-flex items-center gap-1 hover:text-mint-400" href={explorerAddress(r.to)} target="_blank" rel="noreferrer">
          {shortAddress(r.to)} <FiExternalLink />
        </a>
      </div>
    </article>
  );
}

export default function ActivityFeed({ account, feed }) {
  const { items, total, loading, error, refresh, loadMore, hasMore } = feed;

  return (
    <section id="activity" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Recent activity</h2>
          <p className="mt-2 text-sm text-slate-400">{total ? `${total} transfers recorded` : "Newest transfers appear first."}</p>
        </div>
        {account && (
          <button onClick={refresh} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5">
            <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        )}
      </div>

      <div className="mt-8">
        {!account && <Notice tone="warn">Connect your wallet to load the activity feed.</Notice>}
        {error && <Notice tone="error">{error}</Notice>}
        {account && !error && !loading && items.length === 0 && (
          <p className="text-slate-400">No transfers yet — be the first to send one.</p>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => <Card key={r.id} r={r} />)}
        </div>

        {account && hasMore && (
          <div className="mt-8 text-center">
            <button className="btn-primary" onClick={loadMore} disabled={loading}>
              {loading ? <Spinner /> : "Load more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
