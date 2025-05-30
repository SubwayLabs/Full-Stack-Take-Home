import { Card, CardContent, Typography } from "@mui/material";
import Plot from "react-plotly.js";
import { barColors, DataItem, PlotlyHistogramProps } from "..";

export const ChannelHistogram: React.FC<PlotlyHistogramProps> = ({ data }) => {
  const groupedByDate = data.reduce<Record<string, DataItem[]>>((acc, item) => {
    const date = item.batch.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort((a, b) =>
    a.localeCompare(b)
  );

  // Collect all unique channel names (sorted)
  const channelSet = new Set(data.map((item) => item.channel.name));
  const sortedChannels = Array.from(channelSet).sort((a, b) =>
    a.localeCompare(b)
  );

  const totalsByChannel = sortedChannels.map((channel) => {
    // Sum pass rates for this channel across all dates
    const total = data.reduce((sum, item) => {
      if (item.channel.name === channel) {
        return sum + item.passRate * 100;
      }
      return sum;
    }, 0);
    return total;
  });

  const maxPassRate = Math.max(...totalsByChannel);

  const traces = sortedDates.map((date, index) => {
    const items = groupedByDate[date];

    // Map channel to pass rate for this date
    const channelToRate = new Map<string, number>();
    items.forEach((item) =>
      channelToRate.set(item.channel.name, item.passRate * 100)
    );

    return {
      x: sortedChannels,
      y: sortedChannels.map((channel) => channelToRate.get(channel) ?? 0),
      name: date,
      type: "bar" as const,
      marker: { color: barColors[index % barColors.length] },
      hovertemplate: "%{x} Pass Rate: %{y:.0f}%",
      width: 0.09 * sortedChannels.length,
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
          Pass Rate by Channel
        </Typography>
        <Plot
          data={traces}
          layout={{
            barmode: "stack",
            xaxis: {
              title: "Channel Name",
              tickangle: -45,
            },
            yaxis: {
              title: "Pass Rate (%)",
              range: [0, Math.ceil((maxPassRate * 1.2) / 5) * 5],
            },
            legend: {
              title: { text: "Date" },
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
