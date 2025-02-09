import { PublicKey } from "@solana/web3.js";
import { parseTokenHolders } from "./parser/rpc/token/holders";
import { getAllTokenHolders } from "./rpc/tokens";
import { createHolderRecord } from "./db/holders/create";
import { SolanaTracker } from "./solanaTracker/client";

const fartcoin = new PublicKey("9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump");
const jailstool = new PublicKey("AxriehR6Xw3adzHopnvMn7GcpRFcD41ddpiTWMg6pump");
const ufd = new PublicKey("eL5fUxj2J4CiQsmW85k5FG9DvuQjjUoBHoQBi2Kpump");

const { price } = await SolanaTracker.price(
  "AxriehR6Xw3adzHopnvMn7GcpRFcD41ddpiTWMg6pump"
);

const holders = await getAllTokenHolders(jailstool);

const top10 = holders.slice(0, 10);
console.log(top10);

const holderData = parseTokenHolders(holders, price);
await createHolderRecord(holderData);

console.log("success");
