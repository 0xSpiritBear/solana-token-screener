export function parsePools(pools: any[]) {
  if (!pools) {
    return {
      totalLiquidity: null,
      cumulativeVolume: null,
      sufficientLockedLiquidity: null,
      marketCap: null,
      totalBuys: null,
      totalSells: null,
    };
  }

  console.log(pools[0].marketCap.usd);

  const {
    totalLiquidity,
    cumulativeVolume,
    sufficientLockedLiquidity,
    marketCap,
    totalBuys,
    totalSells,
    oldestPool,
  } = pools.reduce(
    (
      {
        totalLiquidity,
        cumulativeVolume,
        sufficientLockedLiquidity,
        marketCap,
        totalBuys,
        totalSells,
        oldestPool,
      }: {
        totalLiquidity: number;
        cumulativeVolume: number;
        sufficientLockedLiquidity: boolean;
        marketCap: any;
        totalBuys: number;
        totalSells: number;
        oldestPool: Date;
      },
      pool: any
    ) => ({
      totalLiquidity: (totalLiquidity += pool.liquidity.usd),
      cumulativeVolume: (cumulativeVolume += pool.txns?.volume ?? 0),
      sufficientLockedLiquidity:
        pool.lpBurn > 85 ? true : sufficientLockedLiquidity,
      marketCap: pool.marketCap?.usd
        ? marketCap + pool.marketCap.usd
        : marketCap,
      totalBuys: (totalBuys += pool.txns?.buys ?? 0),
      totalSells: (totalSells += pool.txns?.sells ?? 0),
      oldestPool:
        oldestPool === null || new Date(pool.createdAt) < oldestPool
          ? new Date(pool.createdAt)
          : oldestPool,
    }),
    {
      totalLiquidity: 0,
      cumulativeVolume: 0,
      sufficientLockedLiquidity: false,
      marketCap: 0,
      totalBuys: 0,
      totalSells: 0,
      oldestPool: null,
    }
  );

  return {
    totalLiquidity,
    cumulativeVolume,
    sufficientLockedLiquidity,
    marketCap,
    totalBuys,
    totalSells,
    oldestPool,
  };
}
