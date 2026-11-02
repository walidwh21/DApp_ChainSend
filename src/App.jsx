import Header from "./components/Header";
import Hero from "./components/Hero";
import SendPanel from "./components/SendPanel";
import Features from "./components/Features";
import ActivityFeed from "./components/ActivityFeed";
import Footer from "./components/Footer";
import Notice from "./components/Notice";
import { useWallet } from "./hooks/useWallet";
import { useFeed } from "./hooks/useFeed";
import { config } from "./lib/config";

export default function App() {
  const wallet = useWallet();
  const feed = useFeed(Boolean(wallet.account) && !wallet.wrongNetwork);
  const missingAddress = !config.demo && !config.ledgerAddress;

  return (
    <>
      <Header account={wallet.account} onConnect={wallet.connect} />
      {(missingAddress || wallet.error) && (
        <div className="mx-auto max-w-6xl px-5 pt-4">
          <Notice tone="warn">
            {wallet.error || "VITE_LEDGER_ADDRESS is not set. Deploy the contract and add its address to your .env file."}
          </Notice>
        </div>
      )}
      <main>
        <Hero />
        <SendPanel
          account={wallet.account}
          wrongNetwork={wallet.wrongNetwork}
          onConnect={wallet.connect}
          onSent={feed.refresh}
        />
        <Features />
        <ActivityFeed account={wallet.account} feed={feed} />
      </main>
      <Footer />
    </>
  );
}
