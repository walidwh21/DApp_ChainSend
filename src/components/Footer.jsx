export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/5 bg-ink-900/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-slate-400 sm:flex-row">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="" className="h-7 w-7" />
          <span className="font-semibold text-slate-200">ChainSend</span>
        </div>
        <p className="text-center">Demo project for learning · runs on Ethereum test networks · not financial advice.</p>
        <p>© {new Date().getFullYear()} ChainSend</p>
      </div>
    </footer>
  );
}
