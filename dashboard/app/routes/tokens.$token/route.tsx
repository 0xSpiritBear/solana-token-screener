import { PrismaClient, type Holders } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "~/components/ui/button";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const db = new PrismaClient();

interface HolderData {
  timestamp: Date;
  top10Percent: number;
  top25Percent: number;
  top50Percent: number;
  top100Percent: number;
  top500Percent: number;
  top1000Percent: number;
  top5000Percent: number;
  top10000Percent: number;
}

interface TotalHoldersData {
  timestamp: Date;
  totalHolders: number;
}

interface Holdings {
  timestamp: Date;
  holdingAtLeast100Dollars: number;
  holdingAtLeast1000Dollars: number;
  holdingAtLeast10000Dollars: number;
  holdingAtLeast100000Dollars: number;
  holdingAtLeast500000Dollars: number;
  holdingAtLeast1000000Dollars: number;
}

const holderLabels = {
  top10Percent: "Top 10 Holders",
  top25Percent: "Top 25 Holders",
  top50Percent: "Top 50 Holders",
  top100Percent: "Top 100 Holders",
  top500Percent: "Top 500 Holders",
  top1000Percent: "Top 1000 Holders",
  top5000Percent: "Top 5000 Holders",
  top10000Percent: "Top 10000 Holders",
} as const;

const holdingLabels = {
  holdingAtLeast100Dollars: "Holding At Least $100",
  holdingAtLeast1000Dollars: "Holding At Least $1,000",
  holdingAtLeast10000Dollars: "Holding At Least $10,000",
  holdingAtLeast100000Dollars: "Holding At Least $100,000",
  holdingAtLeast500000Dollars: "Holding At Least $500,000",
  holdingAtLeast1000000Dollars: "Holding At Least $1,000,000",
} as const;

const totalHolderLabels = {
  totalHolders: "Total Holders",
} as const;

export async function loader({ params }: LoaderFunctionArgs) {
  const data = await db.tokens.findUnique({
    where: { pubkey: params.token },
    include: { holders: true },
  });
  // await db.holders.findMany({
  //   where: {
  //     tokenPubkey: params.token,
  //   },
  // });

  function splitHoldersData(holders: Holders[]) {
    const data = holders.reduce(
      (
        accum: {
          holders: HolderData[];
          holdings: Holdings[];
          totalHolders: TotalHoldersData[];
        },
        current
      ) => {
        const {
          timestamp,
          totalHolders,
          top10Percent,
          top25Percent,
          top50Percent,
          top100Percent,
          top500Percent,
          top1000Percent,
          top5000Percent,
          top10000Percent,
          holdingAtLeast100Dollars,
          holdingAtLeast1000Dollars,
          holdingAtLeast10000Dollars,
          holdingAtLeast100000Dollars,
          holdingAtLeast500000Dollars,
          holdingAtLeast1000000Dollars,
        } = current;

        accum.holders.push({
          timestamp,
          top10Percent,
          top25Percent,
          top50Percent,
          top100Percent,
          top500Percent,
          top1000Percent,
          top5000Percent,
          top10000Percent,
        });

        accum.totalHolders.push({
          timestamp,
          totalHolders,
        });

        accum.holdings.push({
          timestamp,
          holdingAtLeast100Dollars,
          holdingAtLeast1000Dollars,
          holdingAtLeast10000Dollars,
          holdingAtLeast100000Dollars,
          holdingAtLeast500000Dollars,
          holdingAtLeast1000000Dollars,
        });

        return accum;
      },
      { holders: [], holdings: [], totalHolders: [] }
    );

    return data;
  }

  // should return an error to the dom
  if (!data) throw new Error("missing token data");

  const { holders, holdings, totalHolders } = splitHoldersData(data.holders);

  return {
    name: data.name,
    holders,
    holdings,
    totalHolders,
  };
}

export default function Token() {
  const { name, holders, totalHolders, holdings } =
    useLoaderData<typeof loader>();

  console.log(holders.length);

  return (
    <div>
      {name}
      <Button variant="secondary" size="lg">
        Get fucked
      </Button>
      {holders.length > 0 ? (
        <>
          <div>
            Total holders: {totalHolders[totalHolders.length - 1].totalHolders}
          </div>
          <h2>Holders</h2>
          <ChartContainer
            config={{
              top10Percent: { label: "Top 10 Percent", color: "#2563eb" },
              top25Percent: { label: "Top 25 Percent", color: "#2563eb" },
              top50Percent: { label: "Top 50 Percent", color: "#2563eb" },
              top100Percent: { label: "Top 100 Percent", color: "#2563eb" },
              top500Percent: { label: "Top 500 Percent", color: "#2563eb" },
              top1000Percent: { label: "Top 1000 Percent", color: "#2563eb" },
              top5000Percent: { label: "Top 5000 Percent", color: "#2563eb" },
              top10000Percent: { label: "Top 10000 Percent", color: "#2563eb" },
            }}
          >
            <LineChart data={holders}>
              <Line dataKey="top10Percent" />
              <Line dataKey="top25Percent" />
              <Line dataKey="top50Percent" />
              <Line dataKey="top100Percent" />
              <Line dataKey="top500Percent" />
              <Line dataKey="top1000Percent" />
              <Line dataKey="top5000Percent" />
              <Line dataKey="top10000Percent" />
              <YAxis />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </LineChart>
          </ChartContainer>

          <ChartContainer
            config={{
              top10Percent: { label: "Top 10 Percent", color: "#2563eb" },
              top25Percent: { label: "Top 25 Percent", color: "#2563eb" },
              top50Percent: { label: "Top 50 Percent", color: "#2563eb" },
              top100Percent: { label: "Top 100 Percent", color: "#2563eb" },
              top500Percent: { label: "Top 500 Percent", color: "#2563eb" },
              top1000Percent: { label: "Top 1000 Percent", color: "#2563eb" },
              top5000Percent: { label: "Top 5000 Percent", color: "#2563eb" },
              top10000Percent: { label: "Top 10000 Percent", color: "#2563eb" },
            }}
          >
            <BarChart data={holders}>
              <Bar
                dataKey="top10Percent"
                stackId="a"
                fill="#2563eb"
                activeBar={{ fillOpacity: 0.2, fill: "#2563eb" }}
              />
              <Bar dataKey="top25Percent" stackId="a" fill="#3b82f6" />
              <Bar dataKey="top50Percent" stackId="a" fill="#60a5fa" />
              <Bar dataKey="top100Percent" stackId="a" fill="#93c5fd" />
              <Bar dataKey="top500Percent" stackId="a" fill="#bfdbfe" />
              <Bar dataKey="top1000Percent" stackId="a" fill="#dbeafe" />
              <Bar dataKey="top5000Percent" stackId="a" fill="#eff6ff" />
              <Bar dataKey="top10000Percent" stackId="a" fill="#f8fafc" />
              <YAxis domain={[0, 1]} />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              {/* <CartesianGrid vertical={false} /> */}
              <ChartLegend content={<ChartLegendContent />} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: "#c4c4c4", opacity: 0.3 }}
              />
            </BarChart>
          </ChartContainer>

          <h3>Holdings</h3>
          <LineChart height={600} width={800} data={holdings}>
            <Line dataKey="holdingAtLeast100Dollars" stroke="green" />
            <Line dataKey="holdingAtLeast1000Dollars" stroke="blue" />
            <Line dataKey="holdingAtLeast10000Dollars" stroke="green" />
            <Line dataKey="holdingAtLeast100000Dollars" stroke="purple" />
            <Line dataKey="holdingAtLeast500000Dollars" stroke="purple" />
            <Line dataKey="holdingAtLeast1000000Dollars" stroke="purple" />
            <YAxis />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <Legend
              verticalAlign="bottom"
              formatter={(value: keyof typeof holdingLabels) =>
                holdingLabels[value]
              }
            />
            <Tooltip
              formatter={(value: number, name: keyof typeof holdingLabels) => [
                value,
                holdingLabels[name] || name,
              ]}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
          </LineChart>
          <h3>Total Holders</h3>
          <LineChart height={200} width={800} data={totalHolders}>
            <Line dataKey="totalHolders" stroke="green" />
            <YAxis />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <Legend
              verticalAlign="bottom"
              formatter={(value: keyof typeof totalHolderLabels) =>
                totalHolderLabels[value]
              }
            />
            <Tooltip
              formatter={(
                value: number,
                name: keyof typeof totalHolderLabels
              ) => [value, totalHolderLabels[name] || name]}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
          </LineChart>
        </>
      ) : (
        <div>no data</div>
      )}
    </div>
  );
}
