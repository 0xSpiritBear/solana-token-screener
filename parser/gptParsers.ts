function parseTokenDataOG(tokenData: any) {
  const { token, pools, events, risk, buysCount, sellsCount } = tokenData;

  // Metadata
  const hasWebsite = Boolean(token.website);
  const hasTwitter = Boolean(token.twitter);

  // Risk
  const rugged = risk.rugged;
  const riskScore = risk.score; // Lower = better?

  // Price Changes
  const priceChange1h = events["1h"]?.priceChangePercentage || 0;
  const priceChange24h = events["24h"]?.priceChangePercentage || 0;

  // Liquidity & Market
  // (Pick the largest pool or combine them if you want)
  const primaryPool = pools?.[0] || {};
  const liquidityUsd = primaryPool.liquidity?.usd || 0;
  const marketCapUsd = primaryPool.marketCap?.usd || 0;
  const priceUsd = primaryPool.price?.usd || 0;
  const volume = primaryPool.txns?.volume || 0; // Might be 24h or total, check API docs

  // Buys vs Sells
  const totalBuys = buysCount || 0;
  const totalSells = sellsCount || 0;

  return {
    name: token.name,
    symbol: token.symbol,
    mint: token.mint,
    rugged,
    riskScore,
    hasWebsite,
    hasTwitter,
    priceChange1h,
    priceChange24h,
    liquidityUsd,
    marketCapUsd,
    priceUsd,
    totalBuys,
    totalSells,
    volume,
  };
}

function parseAndScoreTokenForLiquidity(rawToken) {
  // Extract the relevant fields
  const { pools, events, risk } = rawToken;

  // Choose the primary or largest pool
  const primaryPool = pools && pools.length > 0 ? pools[0] : {};
  const liquidityUsd = primaryPool.liquidity?.usd || 0;
  const volumeUsd = primaryPool.txns?.volume || 0; // 24h volume in many APIs

  // Price change from the "24h" events
  const priceChange24h = events?.["24h"]?.priceChangePercentage || 0;

  const riskScore = risk?.score ?? 99; // default to “very high” if undefined

  // Score the token
  const finalScore = liquidityScoreToken({
    volumeUsd,
    liquidityUsd,
    priceChange24h,
    riskScore,
  });

  return {
    ...rawToken, // keep all original data
    finalScore,
  };
}

function liquidityScoreToken({
  volumeUsd,
  liquidityUsd,
  priceChange24h,
  riskScore,
}) {
  const vlRatio = liquidityUsd > 0 ? volumeUsd / liquidityUsd : 0;
  // log transform
  const ratioFactor = Math.log10(vlRatio + 1);

  // Pump penalty if 24h change > 100%
  const pumpThreshold = 100;
  let pumpPenalty = 0;
  if (priceChange24h > pumpThreshold) {
    pumpPenalty = (priceChange24h - pumpThreshold) * 0.1;
  }

  // riskFactor = (10 - riskScore) but clamp minimum to 0
  let riskFactor = Math.max(0, 10 - riskScore);

  // Weighted sum
  const finalScore =
    2.0 * ratioFactor + // Emphasize ratio
    1.0 * riskFactor - // Low risk => good
    1.0 * pumpPenalty; // High pump => bad

  return finalScore;
}
