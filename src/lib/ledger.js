import { ethers } from "ethers";
import artifact from "../contracts/TransferLedger.json";
import { config } from "./config";
import { demoRecords } from "./demo";

const getEthereum = () => (typeof window !== "undefined" ? window.ethereum : undefined);
export const hasWallet = () => Boolean(getEthereum());

const providerAndSigner = () => {
  const provider = new ethers.providers.Web3Provider(getEthereum());
  return { provider, signer: provider.getSigner() };
};

const ledgerWith = (signerOrProvider) =>
  new ethers.Contract(config.ledgerAddress, artifact.abi, signerOrProvider);

const toRecord = (r, id) => ({
  id,
  from: r.from,
  to: r.to,
  eth: ethers.utils.formatEther(r.value),
  sentAt: Number(r.sentAt),
  note: r.note,
  tag: r.tag,
});

export async function fetchLatest(offset = 0, limit = config.pageSize) {
  if (config.demo) return demoRecords.slice(offset, offset + limit);
  const { provider } = providerAndSigner();
  const rows = await ledgerWith(provider).latest(offset, limit);
  return rows.map((r, i) => toRecord(r, i + offset));
}

export async function fetchCount() {
  if (config.demo) return demoRecords.length;
  const { provider } = providerAndSigner();
  return (await ledgerWith(provider).recordCount()).toNumber();
}

export async function sendWithNote({ to, eth, note, tag }) {
  if (config.demo) {
    await new Promise((r) => setTimeout(r, 900));
    return { hash: "0xdemo" };
  }
  const { signer } = providerAndSigner();
  const tx = await ledgerWith(signer).send(to, note, tag, { value: ethers.utils.parseEther(eth) });
  await tx.wait();
  return tx;
}

export const isValidAddress = (value) => ethers.utils.isAddress(value);
