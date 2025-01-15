export function parsePools(pools: any[]) {
  const {
    totalLiquidity,
    totalVolume,
    lockedLiquidity,
    totalBuys,
    totalSells,
  } = pools.reduce(
    (
      {
        totalLiquidity,
        totalVolume,
        lockedLiquidity,
        totalBuys,
        totalSells,
      }: {
        totalLiquidity: number;
        totalVolume: number;
        lockedLiquidity: boolean;
        totalBuys: number;
        totalSells: number;
      },
      pool: any
    ) => {
      console.log("----->", {
        lpBurn: pool.lpBurn,
        burnEnough: pool.lpBurn > 85,
      });
      return {
        totalLiquidity: (totalLiquidity += pool.liquidity.usd),
        totalVolume: (totalVolume += pool.txns?.volume ?? 0),
        lockedLiquidity: pool.lpBurn > 85 ? true : lockedLiquidity,
        totalBuys: (totalBuys += pool.txns?.buys ?? 0),
        totalSells: (totalSells += pool.txns?.sells ?? 0),
      };
    },
    {
      totalLiquidity: 0,
      totalVolume: 0,
      lockedLiquidity: false,
      totalBuys: 0,
      totalSells: 0,
    }
  );

  return {
    totalLiquidity,
    totalVolume,
    lockedLiquidity,
    totalBuys,
    totalSells,
  };
}
