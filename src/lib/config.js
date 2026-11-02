const env = import.meta.env;

export const config = {
  ledgerAddress: env.VITE_LEDGER_ADDRESS || "",
  chainId: Number(env.VITE_CHAIN_ID || 11155111),
  explorerUrl: (env.VITE_EXPLORER_URL || "https://sepolia.etherscan.io").replace(/\/$/, ""),
  giphyKey: env.VITE_GIPHY_KEY || "",
  demo: env.VITE_DEMO === "true",
  pageSize: 12,
};

export const explorerAddress = (addr) => `${config.explorerUrl}/address/${addr}`;
