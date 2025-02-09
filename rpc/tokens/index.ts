import { PublicKey, type ParsedAccountData } from "@solana/web3.js";
import { connection } from "..";

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

  return tokenAccounts
    .map(({ account }) => {
      const data = account.data as ParsedAccountData;

      return {
        holder: data.parsed.info.owner,
        amount: data.parsed.info.tokenAmount.uiAmount,
      };
    })
    .filter(({ amount }) => amount > 0)
    .sort((a, b) => b.amount - a.amount);
}
