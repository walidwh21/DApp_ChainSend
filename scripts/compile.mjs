// Compiles contracts/*.sol with solc-js and writes the ABI + bytecode
// to src/contracts/<Name>.json so the front-end and deploy script can use it.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import solc from "solc";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "contracts");
const outDir = path.join(root, "src", "contracts");

const sources = {};
for (const file of fs.readdirSync(srcDir).filter((f) => f.endsWith(".sol"))) {
  sources[file] = { content: fs.readFileSync(path.join(srcDir, file), "utf8") };
}

const input = {
  language: "Solidity",
  sources,
  settings: {
    optimizer: { enabled: true, runs: 200 },
    outputSelection: { "*": { "*": ["abi", "evm.bytecode.object"] } },
  },
};

const result = JSON.parse(solc.compile(JSON.stringify(input)));
const errors = (result.errors || []).filter((e) => e.severity === "error");
(result.errors || []).forEach((e) => console.log(e.formattedMessage));
if (errors.length) process.exit(1);

fs.mkdirSync(outDir, { recursive: true });
for (const [file, contracts] of Object.entries(result.contracts)) {
  for (const [name, data] of Object.entries(contracts)) {
    const out = { contractName: name, abi: data.abi, bytecode: "0x" + data.evm.bytecode.object };
    fs.writeFileSync(path.join(outDir, `${name}.json`), JSON.stringify(out, null, 2));
    console.log(`compiled ${file}:${name} -> src/contracts/${name}.json`);
  }
}
