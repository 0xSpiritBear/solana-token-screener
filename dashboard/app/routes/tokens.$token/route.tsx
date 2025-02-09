import { PrismaClient } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const db = new PrismaClient();

const labels = {
  top10Percent: "Top 10 % Holders",
  top25Percent: "Top 25 % Holders",
  top50Percent: "Top 50 % Holders",
  top100Percent: "Top 100 % Holders",
} as const;

export async function loader({ params }: LoaderFunctionArgs) {
  const holders = await db.holders.findMany({
    where: {
      token: params.token,
    },
    select: {
      timestamp: true,
      top10Percent: true,
      top25Percent: true,
      top50Percent: true,
      top100Percent: true,
      totalHolders: true,
    },
  });

  return {
    holders,
  };
}

export default function Token() {
  const { holders } = useLoaderData<typeof loader>();

  console.log(holders.length);

  return (
    <div>
      {holders.length > 0 ? (
        <>
          <div>Total holders: {holders[holders.length - 1].totalHolders}</div>
          <LineChart height={600} width={800} data={holders}>
            <Line dataKey="top10Percent" stroke="#fff" />
            <Line dataKey="top25Percent" stroke="blue" />
            <Line dataKey="top50Percent" stroke="green" />
            <Line dataKey="top100Percent" stroke="purple" />
            <YAxis />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <Legend
              verticalAlign="bottom"
              formatter={(value: keyof typeof labels) => labels[value]}
            />
            <Tooltip
              formatter={(value: number, name: keyof typeof labels) => [
                `${value.toFixed(2)}%`,
                labels[name] || name,
              ]}
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
