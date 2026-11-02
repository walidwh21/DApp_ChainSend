// Deploys TransferLedger. Credentials come from environment variables only.
//   RPC_URL      - JSON-RPC endpoint of the target network
//   DEPLOYER_KEY - private key of a funded TEST account
import "dotenv/config";
import fs from "node:fs";
import { ethers } from "ethers";

const { RPC_URL, DEPLOYER_KEY } = process.env;
if (!RPC_URL || !DEPLOYER_KEY) {
  console.error("Set RPC_URL and DEPLOYER_KEY in your .env file first.");
  process.exit(1);
}

const artifact = JSON.parse(
  fs.readFileSync(new URL("../src/contracts/TransferLedger.json", import.meta.url), "utf8")
);

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(DEPLOYER_KEY, provider);
const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);

const contract = await factory.deploy();
await contract.deployed();

console.log("TransferLedger deployed at:", contract.address);
console.log("Put this in .env as VITE_LEDGER_ADDRESS");
