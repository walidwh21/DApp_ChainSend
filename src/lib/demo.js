// Sample feed used when VITE_DEMO=true (screenshots, UI development without a wallet).
const now = Math.floor(Date.now() / 1000);
const a = (n) => "0x" + n.toString(16).padStart(2, "0").repeat(20);

export const DEMO_ACCOUNT = "0x71c7656ec7ab88b098defb751b7401b5f6d8976f";

export const demoRecords = [
  { id: 7, from: a(0xa1), to: a(0xb2), eth: "0.25",  sentAt: now - 140,    note: "Thanks for the design review!", tag: "thanks" },
  { id: 6, from: a(0xc3), to: a(0xd4), eth: "1.2",   sentAt: now - 2300,   note: "Rent share for November",       tag: "rent" },
  { id: 5, from: a(0xe5), to: a(0xf6), eth: "0.05",  sentAt: now - 9100,   note: "Coffee on me ☕",                tag: "coffee" },
  { id: 4, from: a(0x17), to: a(0x28), eth: "0.8",   sentAt: now - 30000,  note: "Conference ticket refund",      tag: "refund" },
  { id: 3, from: a(0x39), to: a(0x4a), eth: "0.015", sentAt: now - 90000,  note: "Birthday gift 🎂",               tag: "birthday" },
  { id: 2, from: a(0x5b), to: a(0x6c), eth: "2.5",   sentAt: now - 190000, note: "Freelance invoice #42",         tag: "invoice" },
];
