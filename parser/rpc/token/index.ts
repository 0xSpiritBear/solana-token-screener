import { getMint } from "@solana/spl-token";
import type { PublicKey, Connection } from "@solana/web3.js";

export async function parseMintInfo(pubkey: PublicKey, connection: Connection) {
  const mintInfo = await getMint(connection, pubkey);

  const supply = Number(mintInfo.supply) / Math.pow(10, mintInfo.decimals);

  return {
    ...mintInfo,
    supply,
  };
}
