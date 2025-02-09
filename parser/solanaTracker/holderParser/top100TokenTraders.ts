// held	Total amount of tokens ever held
// sold	Total amount of tokens sold
// holding	Current token balance
// realized	Realized profit/loss in USD
// unrealized	Unrealized profit/loss in USD based on current price
// total	Total profit/loss (realized + unrealized)
// total_invested	Total amount invested in USD

interface TopTraderHoldings {
  wallet: string;
  held: number;
  sold: number;
  holding: number;
  realized: number;
  unrealized: number;
  total: number;
  total_invested: number;
}

export function parseTop100TokenTraders(traders: TopTraderHoldings[]) {
  if (!traders) throw new Error("Missing top 100 traders");

  let top10holding = 0;
  let top25holding = 0;
  let top50holding = 0;
  let top100holding = 0;

  for (const [idx, { holding }] of traders.entries()) {
    if (idx < 10) {
      top10holding += holding;
    }

    if (idx < 25) {
      top25holding += holding;
    }

    if (idx < 50) {
      top50holding += holding;
    }

    top100holding += holding;
  }

  return {
    top10holding,
    top25holding,
    top50holding,
    top100holding,
  };
}
