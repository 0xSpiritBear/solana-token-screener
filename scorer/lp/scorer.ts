import type {
  ParsedTokenData,
  parseTokenData,
} from "../../parser/tokenParser/parser";

export function scoreTokenForLP({
  hasFileMetaData,
  createdOn,
  description,
  image,
  twitter,
  website,
  totalLiquidity,
  cumulativeVolume,
  sufficientLockedLiquidity,
  marketCap,
  totalBuys,
  totalSells,
  oldestPool,
  rugged,
  redFlag,
  riskScore,
  eventMap,
}: ParsedTokenData) {
  let score = 0;

  if (hasFileMetaData) {
    score += 1;
  }

  if (description) {
    score += 1;
  }

  if (image) {
    score += 1;
  }

  if (twitter) {
    score += 1;
  }

  if (website) {
    score += 1;
  }

  if (riskScore) {
    score -= riskScore;
  }

  if (totalLiquidity) {
    if (totalLiquidity > 10000000) {
      score += 5;
    } else if (totalLiquidity > 5000000) {
      score += 4;
    } else if (totalLiquidity > 2500000) {
      score += 3;
    } else if (totalLiquidity > 1000000) {
      score += 2;
    } else if (totalLiquidity > 250000) {
      score += 1;
    }
  }

  if (marketCap) {
    if (marketCap > 100000000) {
      score += 5;
    } else if (marketCap > 50000000) {
      score += 4;
    } else if (marketCap > 25000000) {
      score += 3;
    } else if (marketCap > 15000000) {
      score += 2;
    } else if (marketCap > 10000000) {
      score += 1;
    }
  }

  return score;
}

export function scoreTokenForLPGPT(token: any) {
  // Destructure the fields we care about:
  const {
    totalLiquidity = 0,
    cumulativeVolume = 0,
    riskScore = 10, // default to higher risk if undefined
    eventMap = new Map(),
    rugged = false,
    redFlag = false,
  } = token;

  // Quick safety check: if it's rugged or has a major red flag, give a terrible score
  if (rugged || redFlag) {
    return -9999;
  }

  // 1) Volume-to-Liquidity Ratio
  //    Even though cumulativeVolume is all-time, it's a rough proxy.
  //    The higher the ratio, the better (more volume relative to liquidity).
  const vlRatio = totalLiquidity > 0 ? cumulativeVolume / totalLiquidity : 0;
  // We'll log-transform to avoid huge outliers dominating
  const vlFactor = Math.log10(vlRatio + 1);

  // 2) 24h Price Change: We do NOT want something that’s up excessively.
  //    If it's up a lot, apply a penalty. If it's negative or modest, we won’t penalize.
  const priceChange24h = eventMap.get("24h") ?? 0;
  let pumpPenalty = 0;
  const pumpThreshold = 50; // e.g., anything over +50% in 24h is “excessive”
  if (priceChange24h > pumpThreshold) {
    // The more above 50% it is, the harsher the penalty
    // e.g., +80% => penalty = 30 * 0.2 = 6
    pumpPenalty = (priceChange24h - pumpThreshold) * 0.2;
  } else if (priceChange24h < -50) {
    // If it's down more than 50%, maybe there's a risk of freefall.
    // We can add a small negative penalty here or skip it if you like dips.
    pumpPenalty = (Math.abs(priceChange24h) - 50) * 0.1; // small penalty
  }

  // 3) Volatility Factor:
  //    “Volatile but not up excessively” implies we do want some price movement.
  //    A rough approach is to look at short-term vs. long-term changes.
  //    For instance, we can measure the absolute difference between 1h and 24h changes.
  const priceChange1h = eventMap.get("1h") ?? 0;
  const volatilityEstimate = Math.abs(priceChange1h - priceChange24h);
  // We'll keep it simple: mild reward for some volatility
  // Higher volatility => potentially more fees from trades
  const volatilityFactor = Math.min(volatilityEstimate * 0.2, 10);
  // Cap at +10 for sanity

  // 4) Risk Factor: low riskScore => bigger positive
  //    If riskScore ~ 0 => +10, if riskScore ~ 10 => 0
  let riskFactor = Math.max(0, 10 - riskScore);

  // Combine everything into a final score
  // Weighting each piece differently:
  let finalScore = 0;
  finalScore += 2.0 * vlFactor; // emphasize volume-to-liquidity
  finalScore += 1.0 * volatilityFactor; // we do want some volatility
  finalScore += 1.0 * riskFactor; // safer = better
  finalScore -= 1.0 * pumpPenalty; // penalize big run-ups

  return finalScore;
}
