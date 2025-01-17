export class SolanaTracker {
  private static endpoint = "https://data.solanatracker.io/";
  private static apiKey = process.env.SOLANA_TRACKER_SECRET_KEY ?? null;

  private constructor() {}

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

  private static async fetchData(path: string) {
    if (!this.apiKey) throw new Error("Missing Solana Tracker API key");

    const url = new URL(this.endpoint);
    url.pathname = path;

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
