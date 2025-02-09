import { parseEvents } from "./tokenParser/utils/events";
import { parsePools } from "./tokenParser/utils/pools";
import { parseRisks } from "./tokenParser/utils/risks";
import { parseTokenInfo } from "./tokenParser/utils/token";

export function parseTokenData(tokenData: any): any {
  // console.log(tokenData);
  const { token, pools, risk, events } = tokenData;

  const {
    name,
    symbol,
    mint,
    uri,
    hasFileMetaData,
    createdOn,
    description,
    image,
    twitter,
    website,
  } = parseTokenInfo(token);
  const {
    totalLiquidity,
    cumulativeVolume,
    sufficientLockedLiquidity,
    marketCap,
    totalBuys,
    totalSells,
    oldestPool,
  } = parsePools(pools);
  const { redFlag, riskScore, rugged } = parseRisks(risk);
  const { eventMap } = parseEvents(events);

  return {
    name,
    symbol,
    mint,
    uri,
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
  };
}

export interface ParsedTokenData {
  name: string;
  symbol: string;
  mint: string;
  uri: string;
  hasFileMetaData: boolean;
  createdOn: Date; // or Date depending on your needs
  description: string;
  image: string;
  twitter: string;
  website: string;
  totalLiquidity: number;
  cumulativeVolume: number;
  sufficientLockedLiquidity: boolean;
  marketCap: number;
  totalBuys: number;
  totalSells: number;
  oldestPool: Date; // or Date
  rugged: boolean;
  redFlag: boolean;
  riskScore: number;
  eventMap: Record<string, number>; // Update this type based on your event structure
}
