import { FiShield, FiZap, FiEye } from "react-icons/fi";

const items = [
  { icon: FiShield, color: "bg-mint-500", title: "Non-custodial", text: "Funds go straight from your wallet to the recipient. ChainSend never holds your ETH or your keys." },
  { icon: FiZap, color: "bg-iris-500", title: "One transaction", text: "The contract forwards the value and logs the record atomically, so you confirm once and pay gas once." },
  { icon: FiEye, color: "bg-rose-500", title: "Transparent history", text: "Every transfer and note is publicly verifiable on the block explorer and shown in the activity feed." },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14">
      <h2 className="text-3xl font-bold text-white">Why ChainSend</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {items.map(({ icon: Icon, color, title, text }) => (
          <article key={title} className="panel p-6 transition hover:-translate-y-1 hover:border-white/20">
            <span className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white ${color}`}>
              <Icon size={20} />
            </span>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
