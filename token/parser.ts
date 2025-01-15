import { parsePools } from "./helpers";

export function parseTokenData(tokenData: any): any {
  const { pools } = tokenData;
  //   console.log("txns", pools[0].txns);
  //   console.log("volume", pools[0].txns.volume);

  //   const { liquidity, volume } = pools.reduce(
  const {
    totalLiquidity,
    totalVolume,
    lockedLiquidity,
    totalBuys,
    totalSells,
  } = parsePools(pools);
  //   const pool = pools[0];

  //   console.log("liquidity", pool.liquidity);
  //   console.log("price", pool.price);
  //   console.log("marketcap", pool.marketCap);
  //   console.log("security", pool.security);

  return {
    totalLiquidity,
    totalVolume,
    lockedLiquidity,
    totalBuys,
    totalSells,
  };
}
