import { db } from "..";
import type { parseTokenHolders } from "../../parser/rpc/token/holders";

export async function createHolderRecord(
  data: ReturnType<typeof parseTokenHolders>
) {
  const record = await db.holders.create({
    data: {
      timestamp: new Date(Date.now()),
      token: "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
      totalTokens: data.totalTokens,
      totalHolders: data.totalHolders,
      top10Percent: data.top10.percent,
      top25Percent: data.top25.percent,
      top50Percent: data.top50.percent,
      top100Percent: data.top100.percent,
      top500Percent: data.top500.percent,
      top1000Percent: data.top1000.percent,
      top5000Percent: data.top5000.percent,
      top10000Percent: data.top10000.percent,
      holdingAtLeast100Dollars: data.holdingAtLeast100Dollars,
      holdingAtLeast1000Dollars: data.holdingAtLeast1000Dollars,
      holdingAtLeast10000Dollars: data.holdingAtLeast10000Dollars,
      holdingAtLeast100000Dollars: data.holdingAtLeast100000Dollars,
      holdingAtLeast500000Dollars: data.holdingAtLeast500000Dollars,
      holdingAtLeast1000000Dollars: data.holdingAtLeast1000000Dollars,
    },
  });

  return record;
}
