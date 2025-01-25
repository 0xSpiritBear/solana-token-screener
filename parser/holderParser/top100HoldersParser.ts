interface Top100Holders {
  total: number;
  accounts: Holder[];
}

interface Holder {
  wallet: string;
  amount: number;
  value: {
    quote: number;
    usd: number;
  };
  percentage: number;
}

export function parseTop100Holders({ total, accounts }: Top100Holders) {
  const topHoldings = sumTotalHoldingsOfTop100(accounts);

  return {
    totalHolders: total,
    ...topHoldings,
  };
}

export function sumTotalHoldingsOfTop100(holders: Holder[]) {
  let top10 = {
    amount: 0,
    percent: 0,
  };
  let top25 = {
    amount: 0,
    percent: 0,
  };
  let top50 = {
    amount: 0,
    percent: 0,
  };
  let top100 = {
    amount: 0,
    percent: 0,
  };

  for (const [idx, { amount, percentage }] of holders.entries()) {
    if (idx < 10) {
      top10.amount += amount;
      top10.percent += percentage;
    }

    if (idx < 25) {
      top25.amount += amount;
      top25.percent += percentage;
    }

    if (idx < 50) {
      top50.amount += amount;
      top50.percent += percentage;
    }

    if (idx < 100) {
      top100.amount += amount;
      top100.percent += percentage;
    }
  }

  return {
    top10,
    top25,
    top50,
    top100,
  };
}
