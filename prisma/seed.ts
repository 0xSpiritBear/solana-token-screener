import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const data = {
  totalTokens: 999995367.6875818,
  totalHolders: 109364,
  top10: {
    amount: 146480582.44424903,
    percent: 0.14648126099121336,
  },
  top25: {
    amount: 236152349.42896405,
    percent: 0.23615344336549235,
  },
  top50: {
    amount: 336561154.92751306,
    percent: 0.3365627139911526,
  },
  top100: {
    amount: 459627641.628284,
    percent: 0.4596297707769789,
  },
  top500: {
    amount: 730754689.4304,
    percent: 0.7307580745301033,
  },
  top1000: {
    amount: 821583876.0104905,
    percent: 0.8215876818613119,
  },
  top5000: {
    amount: 953917310.2743548,
    percent: 0.9539217291378267,
  },
  top10000: {
    amount: 980718358.1220033,
    percent: 0.9807229011368771,
  },
};
