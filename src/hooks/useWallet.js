import { useCallback, useEffect, useState } from "react";
import { config } from "../lib/config";
import { DEMO_ACCOUNT } from "../lib/demo";
import { hasWallet } from "../lib/ledger";

/** Tracks the connected account and chain, and exposes connect(). */
export function useWallet() {
  const [account, setAccount] = useState(config.demo ? DEMO_ACCOUNT : "");
  const [chainId, setChainId] = useState(config.demo ? config.chainId : null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (config.demo || !hasWallet()) return;
    const eth = window.ethereum;

    eth.request({ method: "eth_accounts" }).then((a) => setAccount(a[0] || ""));
    eth.request({ method: "eth_chainId" }).then((id) => setChainId(parseInt(id, 16)));

    const onAccounts = (a) => setAccount(a[0] || "");
    const onChain = (id) => setChainId(parseInt(id, 16));
    eth.on("accountsChanged", onAccounts);
    eth.on("chainChanged", onChain);
    return () => {
      eth.removeListener("accountsChanged", onAccounts);
      eth.removeListener("chainChanged", onChain);
    };
  }, []);

  const connect = useCallback(async () => {
    setError("");
    if (config.demo) return setAccount(DEMO_ACCOUNT);
    if (!hasWallet()) return setError("No browser wallet detected. Install MetaMask to continue.");
    try {
      const a = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(a[0] || "");
    } catch (e) {
      setError(e?.message || "Connection was rejected.");
    }
  }, []);

  const wrongNetwork = Boolean(account) && chainId !== null && chainId !== config.chainId;
  return { account, chainId, wrongNetwork, connect, error };
}
