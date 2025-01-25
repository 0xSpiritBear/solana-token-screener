import { SolanaTracker } from "./solanaTracker/client";
import { parseTokenData } from "./parser/tokenParser/parser";
import { parseEvents } from "./parser/tokenParser/utils/events";
import { scoreTokenForLP } from "./scorer/lp/scorer";
import { parseTop100Holders } from "./parser/holderParser/top100HoldersParser";

// const data = await SolanaTracker.token(
//   //   "eL5fUxj2J4CiQsmW85k5FG9DvuQjjUoBHoQBi2Kpump"
//   // "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump"
//   // "FpRGCAeSbQEVVnTBnnQ2Vnyv6bmngx6eG5rbGuxHCJ1w"
//   "4FkNq8RcCYg4ZGDWh14scJ7ej3m5vMjYTcWoJVkupump"
// );

// console.log(data.risk.risks);
// console.log(data);

// const data = await SolanaTracker.trendingTokens();

// const parsedTokens = data
//   .map((token: any) => {
//     const parsedData = parseTokenData(token);
//     const lpScore = scoreTokenForLP(parsedData);

//     return {
//       ...parsedData,
//       lpScore,
//     };
//   })
//   .sort((a: any, b: any) => b.lpScore - a.lpScore)
//   .filter((token: any) => !token.rugged);

// for (let i = 0; i < 5; i++) {
//   console.log(parsedTokens[i]);
// }

// const parsedData = parseTokenData(data);
// const score = scoreTokenForLP(parsedData);

// const parsedAndScore = {
//   ...parsedData,
//   score,
// };

// console.log(parsedAndScore);

// const parsedData = parseTokenData(data);
// const finalScore = scoreTokenForLP(parsedData);
// console.log("final score", finalScore);

// const data = await SolanaTracker.tokensByVolume();
// console.log(data[0]);

const data = await SolanaTracker.top100Holders(
  // "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump" // fartcoin
  // "4FkNq8RcCYg4ZGDWh14scJ7ej3m5vMjYTcWoJVkupump" // lumo
  // "eL5fUxj2J4CiQsmW85k5FG9DvuQjjUoBHoQBi2Kpump" // ufd
  // "63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9" //giga
  "61V8vBaqAGMpgDQi4JcAwo1dmBGHsyhzodcPqnEVpump" //arc
);

const total = parseTop100Holders(data);
console.log("->", total);
