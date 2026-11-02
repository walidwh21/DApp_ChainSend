import { FiArrowDown } from "react-icons/fi";

const stats = [
  ["1 tx", "transfer + record"],
  ["140", "chars per note"],
  ["0", "custody — your keys"],
];

export default function Hero() {
  return (
    <section id="top" className="hero-glow">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-16 sm:pt-24">
        <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          Wallet-to-wallet ETH · public notes · on-chain feed
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
          Send ETH and say <span className="text-grad">why</span>, in one transaction.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-slate-400">
          Every transfer carries a short note and a tag, stored on-chain and shown in a live activity feed.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#send" className="btn-primary">Start sending <FiArrowDown /></a>
          <a href="#activity" className="text-sm text-slate-300 underline-offset-4 hover:underline">See recent activity</a>
        </div>

        <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-4">
          {stats.map(([big, small]) => (
            <div key={big} className="panel px-4 py-4">
              <dt className="text-2xl font-bold text-white">{big}</dt>
              <dd className="mt-1 text-xs text-slate-400">{small}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
