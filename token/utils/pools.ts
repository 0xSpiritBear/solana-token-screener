export function parsePools(pools: any[]) {
  const {
    totalLiquidity,
    cumulativeVolume,
    sufficientLockedLiquidity,
    totalBuys,
    totalSells,
  } = pools.reduce(
    (
      {
        totalLiquidity,
        cumulativeVolume,
        sufficientLockedLiquidity,
        totalBuys,
        totalSells,
      }: {
        totalLiquidity: number;
        cumulativeVolume: number;
        sufficientLockedLiquidity: boolean;
        totalBuys: number;
        totalSells: number;
      },
      pool: any
    ) => ({
      totalLiquidity: (totalLiquidity += pool.liquidity.usd),
      cumulativeVolume: (cumulativeVolume += pool.txns?.volume ?? 0),
      sufficientLockedLiquidity:
        pool.lpBurn > 85 ? true : sufficientLockedLiquidity,
      totalBuys: (totalBuys += pool.txns?.buys ?? 0),
      totalSells: (totalSells += pool.txns?.sells ?? 0),
    }),
    {
      totalLiquidity: 0,
      cumulativeVolume: 0,
      sufficientLockedLiquidity: false,
      totalBuys: 0,
      totalSells: 0,
    }
  );

  return {
    totalLiquidity,
    cumulativeVolume,
    sufficientLockedLiquidity,
    totalBuys,
    totalSells,
  };
}
