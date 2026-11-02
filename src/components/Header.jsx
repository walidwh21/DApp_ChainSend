import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { shortAddress } from "../lib/format";

const links = [
  { label: "Send", href: "#send" },
  { label: "Why ChainSend", href: "#features" },
  { label: "Activity", href: "#activity" },
];

export default function Header({ account, onConnect }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="" className="h-9 w-9" />
          <span className="text-lg font-bold tracking-tight text-white">
            Chain<span className="text-grad">Send</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden md:block">
          {account ? (
            <span className="rounded-full border border-mint-500/40 bg-mint-500/10 px-4 py-2 font-mono text-xs text-mint-400">
              ● {shortAddress(account)}
            </span>
          ) : (
            <button className="btn-primary !py-2" onClick={onConnect}>Connect wallet</button>
          )}
        </div>

        <button className="text-2xl text-white md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {open && (
        <div className="space-y-3 border-t border-white/5 px-5 py-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-slate-200">{l.label}</a>
          ))}
          {!account && <button className="btn-primary w-full" onClick={onConnect}>Connect wallet</button>}
        </div>
      )}
    </header>
  );
}
