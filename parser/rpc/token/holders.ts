interface Holder {
  holder: string;
  amount: number;
}

export function parseTokenHolders(holders: Holder[], price: number) {
  let totalTokens = 0;
  let holdingAtLeast100Dollars = 0;
  let holdingAtLeast1000Dollars = 0;
  let holdingAtLeast10000Dollars = 0;
  let holdingAtLeast100000Dollars = 0;
  let holdingAtLeast500000Dollars = 0;
  let holdingAtLeast1000000Dollars = 0;

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
  let top500 = {
    amount: 0,
    percent: 0,
  };
  let top1000 = {
    amount: 0,
    percent: 0,
  };
  let top5000 = {
    amount: 0,
    percent: 0,
  };
  let top10000 = {
    amount: 0,
    percent: 0,
  };

  for (const [idx, { amount }] of holders.entries()) {
    const dollarValueOfHoldings = amount * price;
    totalTokens += amount;

    if (idx < 10) {
      top10.amount += amount;
    }

    if (idx < 25) {
      top25.amount += amount;
    }

    if (idx < 50) {
      top50.amount += amount;
    }

    if (idx < 100) {
      top100.amount += amount;
    }

    if (idx < 500) {
      top500.amount += amount;
    }

    if (idx < 1000) {
      top1000.amount += amount;
    }

    if (idx < 5000) {
      top5000.amount += amount;
    }

    if (idx < 10000) {
      top10000.amount += amount;
    }

    if (dollarValueOfHoldings >= 100) {
      holdingAtLeast100Dollars++;
    }

    if (dollarValueOfHoldings >= 1_000) {
      holdingAtLeast1000Dollars++;
    }

    if (dollarValueOfHoldings >= 10_000) {
      holdingAtLeast10000Dollars++;
    }

    if (dollarValueOfHoldings >= 100_000) {
      holdingAtLeast100000Dollars++;
    }

    if (dollarValueOfHoldings >= 500_000) {
      holdingAtLeast500000Dollars++;
    }

    if (dollarValueOfHoldings >= 1_000_000) {
      holdingAtLeast1000000Dollars++;
    }
  }

  top10.percent = top10.amount / totalTokens;
  top25.percent = top25.amount / totalTokens;
  top50.percent = top50.amount / totalTokens;
  top100.percent = top100.amount / totalTokens;
  top500.percent = top500.amount / totalTokens;
  top1000.percent = top1000.amount / totalTokens;
  top5000.percent = top5000.amount / totalTokens;
  top10000.percent = top10000.amount / totalTokens;

  return {
    totalTokens,
    totalHolders: holders.length,
    top10,
    top25,
    top50,
    top100,
    top500,
    top1000,
    top5000,
    top10000,
    holdingAtLeast100Dollars,
    holdingAtLeast1000Dollars,
    holdingAtLeast10000Dollars,
    holdingAtLeast100000Dollars,
    holdingAtLeast500000Dollars,
    holdingAtLeast1000000Dollars,
  };
}
