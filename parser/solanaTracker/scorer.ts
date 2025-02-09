function calculateScore(parsed: any) {
  let score = 0;

  // Liquidity Weight (higher is better)
  if (parsed?.liquidityUsd) {
    score += Math.min(parsed.liquidityUsd / 5000, 20);
    // e.g., give up to 20 points for liquidity (capped at $100k)
  }

  // Market Cap (smaller = more potential upside, but also riskier)
  // Let’s say we reward mid-range market caps
  if (parsed?.marketCapUsd) {
    if (parsed.marketCapUsd > 100000 && parsed.marketCapUsd < 5000000) {
      score += 10;
    }
  }

  // Price Momentum
  // If 1h is positive, add half of that change to score
  if (parsed.priceChange1h) {
    score += parsed.priceChange1h * 0.5;
  }
  // If 24h is positive, add the full change to score
  if (parsed.priceChange24h) {
    score += parsed.priceChange24h;
  }

  // Risk
  // If riskScore is low, add some points
  if (parsed.riskScore) {
    if (parsed.riskScore < 5) {
      score += 10;
    }
  }

  // Social
  if (parsed.hasWebsite) score += 5;
  if (parsed.hasTwitter) score += 5;

  return score;
}
