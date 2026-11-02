import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { SiEthereum } from "react-icons/si";
import { isValidAddress, sendWithNote } from "../lib/ledger";
import { config } from "../lib/config";
import { shortAddress } from "../lib/format";
import Notice from "./Notice";
import Spinner from "./Spinner";

const empty = { to: "", eth: "", tag: "", note: "" };

export default function SendPanel({ account, wrongNetwork, onConnect, onSent }) {
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null); // { tone, text }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const problem = (() => {
    if (!form.to && !form.eth) return "";
    if (form.to && !isValidAddress(form.to)) return "Recipient is not a valid Ethereum address.";
    if (form.eth && !(Number(form.eth) > 0)) return "Amount must be greater than zero.";
    return "";
  })();

  const ready = form.to && form.eth && !problem && !wrongNetwork;

  const submit = async (e) => {
    e.preventDefault();
    if (!ready) return;
    setBusy(true);
    setStatus(null);
    try {
      await sendWithNote(form);
      setStatus({ tone: "ok", text: `Sent ${form.eth} ETH to ${shortAddress(form.to)}.` });
      setForm(empty);
      onSent?.();
    } catch (err) {
      const text = err?.code === 4001 || err?.code === "ACTION_REJECTED"
        ? "You cancelled the transaction."
        : err?.reason || err?.message || "Transaction failed.";
      setStatus({ tone: "error", text });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="send" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14">
      <div className="grid items-start gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-white">Send with a note</h2>
          <p className="mt-3 text-slate-400">
            Pick a recipient, an amount and an optional message. One confirmation in your wallet moves the funds
            and writes the record.
          </p>

          <div className="relative mt-8 h-44 max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-iris-500 via-ink-700 to-mint-600 p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60">
                <SiEthereum className="text-white" />
              </span>
              <span className="text-xs uppercase tracking-widest text-white/70">
                {config.demo ? "Demo" : "Connected"}
              </span>
            </div>
            <div className="absolute bottom-5 left-5">
              <p className="font-mono text-sm text-white/80">{account ? shortAddress(account, 8, 6) : "Not connected"}</p>
              <p className="mt-1 font-semibold text-white">Ethereum account</p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="panel space-y-4 p-6 lg:col-span-3">
          {wrongNetwork && <Notice>Switch your wallet to chain ID {config.chainId} to send.</Notice>}

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-slate-400">Recipient address</span>
            <input className="field font-mono" placeholder="0x…" value={form.to} onChange={set("to")} />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-400">Amount (ETH)</span>
              <input className="field" type="number" min="0" step="0.0001" placeholder="0.05" value={form.eth} onChange={set("eth")} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-400">Tag</span>
              <input className="field" maxLength={40} placeholder="coffee, rent, thanks…" value={form.tag} onChange={set("tag")} />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 flex justify-between text-xs font-medium text-slate-400">
              Note <span>{form.note.length}/140</span>
            </span>
            <textarea className="field resize-none" rows={3} maxLength={140} placeholder="Say something nice…" value={form.note} onChange={set("note")} />
          </label>

          {problem && <p className="text-sm text-rose-300">{problem}</p>}
          {status && <Notice tone={status.tone}>{status.text}</Notice>}

          {account ? (
            <button type="submit" className="btn-primary w-full" disabled={!ready || busy}>
              {busy ? <><Spinner /> Waiting for confirmation…</> : <><FiSend /> Send now</>}
            </button>
          ) : (
            <button type="button" className="btn-primary w-full" onClick={onConnect}>Connect wallet to send</button>
          )}
        </form>
      </div>
    </section>
  );
}
