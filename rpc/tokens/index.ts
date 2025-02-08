import { PublicKey } from "@solana/web3.js";
import { connection } from "../..";

export async function getAllTokenHolders(token: PublicKey) {
  const tokenAccounts = await connection.getParsedProgramAccounts(
    new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
    {
      filters: [
        { dataSize: 165 },
        {
          memcmp: {
            offset: 0,
            bytes: token.toBase58(),
          },
        },
      ],
    }
  );

  for (const holder of tokenAccounts) {
    console.log(holder.account.executable);
    console.log(holder.account.data);
  }

  return tokenAccounts
    .map(({ account }) => ({
      owner: account.data.parsed.info.owner,
      amount: account.data.parsed.info.tokenAmount.uiAmount,
    }))
    .filter(({ amount }) => amount > 0)
    .sort((a, b) => b.amount - a.amount);
}
