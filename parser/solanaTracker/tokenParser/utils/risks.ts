const redFlags = [
  "FREEZE AUTHORITY ENABLED",
  "MINT AUTHORITY ENABLED",
  "RUGGED",
  "LOW LIQUIDITY (VERY LOW)",
  "LP BURNED",
  "SINGLE HOLDER OWNERSHIP (>90%)",
  "SINGLE HOLDER OWNERSHIP (>80%)",
  "SINGLE HOLDER OWNERSHIP (>70%)",
  "SINGLE HOLDER OWNERSHIP (>60%)",
  "SINGLE HOLDER OWNERSHIP (>50%)",
  "SINGLE HOLDER OWNERSHIP (>40%)",
  "SINGLE HOLDER OWNERSHIP (>30%)",
  "SINGLE HOLDER OWNERSHIP (>20%)",
  //   "SINGLE HOLDER OWNERSHIP (>10%)",
];

export function parseRisks(risk: any) {
  let redFlag = false;

  if (risk.risks) {
    risk.risks.forEach((risk: any) => {
      if (redFlags.includes(risk.name.toUpperCase())) {
        redFlag = true;
      }
    });
  }

  return {
    redFlag,
    rugged: risk.rugged,
    riskScore: risk.score,
  };
}
