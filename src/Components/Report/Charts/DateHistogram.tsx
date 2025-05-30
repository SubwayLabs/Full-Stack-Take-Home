import { Card, CardContent, Typography } from "@mui/material";
import Plot from "react-plotly.js";
import { barColors, DataItem, PlotlyHistogramProps } from "..";

export const DateHistogram: React.FC<PlotlyHistogramProps> = ({ data }) => {
  const passRateByDate = data.reduce<Record<string, number>>((acc, item) => {
    const date = item.batch.date;
    if (!acc[date]) acc[date] = 0;
    acc[date] += item.passRate * 100;
    return acc;
  }, {});

  const maxPassRate = Math.max(...Object.values(passRateByDate));

  const groupedByChannel = data.reduce<Record<string, DataItem[]>>(
    (acc, item) => {
      const channelName = item.channel.name;
      if (!acc[channelName]) acc[channelName] = [];
      acc[channelName].push(item);
      return acc;
    },
    {}
  );

  // Sort channel names alphabetically
  const sortedChannelNames = Object.keys(groupedByChannel).sort((a, b) =>
    a.localeCompare(b)
  );

  const traces = sortedChannelNames.map((channelName, index) => {
    const items = groupedByChannel[channelName];
    return {
      x: items.map((i) => i.batch.date),
      y: items.map((i) => i.passRate * 100),
      name: channelName,
      type: "bar" as const,
      marker: { color: barColors[index] },
      hovertemplate: "Date: %{x}, Pass Rate: %{y:.0f}%",
    };
  });

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color="primary"
          sx={{ fontSize: "1.5rem" }}
        >
          Pass Rate by Date
        </Typography>
        <Plot
          data={traces}
          layout={{
            barmode: "stack",
            xaxis: {
              title: "Date",
              tickangle: -45,
            },
            yaxis: {
              title: "Pass Rate (%)",
              range: [0, Math.ceil((maxPassRate * 1.2) / 5) * 5],
            },
            legend: {
              title: { text: "Channel" },
            },
            plot_bgcolor: "#fff",
            paper_bgcolor: "#fff",
            autosize: true,
            height: 350,
            margin: { t: 40, b: 80 },
          }}
          config={{ responsive: true }}
          style={{ width: "100%" }}
        />
      </CardContent>
    </Card>
  );
};
