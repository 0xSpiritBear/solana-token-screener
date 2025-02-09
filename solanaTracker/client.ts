interface Price {
  price: number;
  priceQuote: number;
  liquidity: number;
  marketCap: number;
  lastUpdated: number;
}

export class SolanaTracker {
  private static endpoint = "https://data.solanatracker.io/";
  private static apiKey = process.env.SOLANA_TRACKER_SECRET_KEY ?? null;

  private constructor() {}

  static async price(token: string) {
    const path = `price`;

    return (await this.fetchData(path, { token })) as Price;
  }

  static async token(tokenAddress: string) {
    const path = `tokens/${tokenAddress}`;
    const data = await this.fetchData(path);

    return data;
  }

  static async tokensByVolume() {
    const path = "tokens/volume";

    return await this.fetchData(path);
  }

  static async trendingTokens() {
    const path = "tokens/trending";

    return await this.fetchData(path);
  }

  static async top100TokenHolders(token: string) {
    const path = `tokens/${token}/holders`;

    return await this.fetchData(path);
  }

  static async top100TokenTraders(token: string) {
    const path = `top-traders/${token}`;

    return await this.fetchData(path);
  }

  private static async fetchData(
    path: string,
    queryParams?: Record<string, string>
  ) {
    if (!this.apiKey) throw new Error("Missing Solana Tracker API key");

    const url = new URL(this.endpoint);
    url.pathname = path;

    if (queryParams) {
      for (const param in queryParams) {
        url.searchParams.append(param, queryParams[param]);
      }
    }

    // const res = await fetch(`${this.endpoint}tokens/trending`, {
    const res = await fetch(url, {
      headers: {
        "x-api-key": this.apiKey,
      },
    });

    if (!res.ok)
      throw new Error("fetching data failed", {
        cause: {
          status: res.status,
          body: res.body,
        },
      });

    return await res.json();
  }
}
