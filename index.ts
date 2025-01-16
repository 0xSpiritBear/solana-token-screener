import { SolanaTracker } from "./solanaTracker/client";
import { parseTokenData } from "./token/parser";

const data = await SolanaTracker.token(
  //   "eL5fUxj2J4CiQsmW85k5FG9DvuQjjUoBHoQBi2Kpump"
  "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump"
);

const parsedData = parseTokenData(data);
console.log(parsedData);

// const data = await SolanaTracker.tokensByVolume();
// console.log(data[0]);
