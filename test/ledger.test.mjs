import assert from "node:assert/strict";
import fs from "node:fs";
import ganache from "ganache";
import { ethers } from "ethers";

const artifact = JSON.parse(
  fs.readFileSync(new URL("../src/contracts/TransferLedger.json", import.meta.url), "utf8")
);

const provider = new ethers.providers.Web3Provider(ganache.provider({ logging: { quiet: true } }));
const [alice, bob] = [provider.getSigner(0), provider.getSigner(1)];
const bobAddr = await bob.getAddress();

const ledger = await new ethers.ContractFactory(artifact.abi, artifact.bytecode, alice).deploy();
await ledger.deployed();

const tests = {
  async "forwards ETH and records it"() {
    const before = await provider.getBalance(bobAddr);
    await (await ledger.send(bobAddr, "lunch", "food", { value: ethers.utils.parseEther("1") })).wait();
    const after = await provider.getBalance(bobAddr);
    assert.equal(after.sub(before).toString(), ethers.utils.parseEther("1").toString());
    assert.equal((await ledger.recordCount()).toNumber(), 1);
  },
  async "returns newest first with paging"() {
    for (const n of ["two", "three"]) {
      await (await ledger.send(bobAddr, n, "t", { value: 1 })).wait();
    }
    const page = await ledger.latest(0, 2);
    assert.deepEqual(page.map((r) => r.note), ["three", "two"]);
    const rest = await ledger.latest(2, 10);
    assert.deepEqual(rest.map((r) => r.note), ["lunch"]);
    assert.equal((await ledger.latest(99, 5)).length, 0);
  },
  async "rejects zero value"() {
    await assert.rejects(ledger.send(bobAddr, "x", "y", { value: 0 }));
  },
  async "rejects zero address"() {
    await assert.rejects(ledger.send(ethers.constants.AddressZero, "x", "y", { value: 1 }));
  },
  async "rejects overlong text"() {
    await assert.rejects(ledger.send(bobAddr, "a".repeat(141), "y", { value: 1 }));
  },
};

let failed = 0;
for (const [name, fn] of Object.entries(tests)) {
  try { await fn(); console.log("  ok  ", name); }
  catch (e) { failed++; console.log("  FAIL", name, "\n      ", e.message); }
}
process.exit(failed ? 1 : 0);
