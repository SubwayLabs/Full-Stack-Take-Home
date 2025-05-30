import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";

import HomeIcon from "@mui/icons-material/Home";
import { LocalizationProvider, PickersActionBar } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { BatchTableQuery } from "./__generated__/BatchTableQuery.graphql";
import BatchTable from "./BatchTable";
import { ChannelHistogram } from "./Charts/ChannelHistogram";
import { DateHistogram } from "./Charts/DateHistogram";

export type DataItem = {
  channel: { id: string; name: string };
  batch: { date: string };
  passRate: number;
};

export type PlotlyHistogramProps = {
  data: DataItem[];
};

export const barColors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];

type ReportProps = {
  channelIds: string[];
};

export default function Report({ channelIds }: ReportProps) {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs("2025-05-01"),
    dayjs("2025-05-31"),
  ]);
  const [inputDateRange, setInputDateRange] =
    useState<[Dayjs | null, Dayjs | null]>(dateRange);
  const [start, end] = dateRange;
  const formattedStart = start?.format("YYYY-MM-DD") ?? "";
  const formattedEnd = end?.format("YYYY-MM-DD") ?? "";

  const [passCapacity, setPassCapacity] = useState<number>(0.9);
  const [inputPassCapacity, setInputPassCapacity] =
    useState<number>(passCapacity);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlStart = searchParams.get("start");
    const urlEnd = searchParams.get("end");
    const urlPassCapacity = searchParams.get("passCapacity");

    if (urlStart && urlEnd) {
      const newRange: [Dayjs, Dayjs] = [dayjs(urlStart), dayjs(urlEnd)];
      setDateRange(newRange);
      setInputDateRange(newRange);
    }

    if (urlPassCapacity) {
      const parsedPassCapacity = parseFloat(urlPassCapacity);
      if (!isNaN(parsedPassCapacity)) {
        setPassCapacity(parsedPassCapacity);
        setInputPassCapacity(parsedPassCapacity);
      }
    }
  }, [searchParams]);

  const reports = useReports(
    channelIds,
    formattedStart,
    formattedEnd,
    passCapacity
  );

  const handleUpdateParams = () => {
    setDateRange(inputDateRange);
    setPassCapacity(inputPassCapacity);

    const [startDate, endDate] = inputDateRange;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("start", startDate.format("YYYY-MM-DD"));
    newParams.set("end", endDate.format("YYYY-MM-DD"));
    newParams.set("passCapacity", inputPassCapacity.toString());
    setSearchParams(newParams);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Typography variant="h3">
          {channelIds.length === 1 ? reports[0]?.channel?.name : "Bulk Report"}
        </Typography>
        <IconButton component={Link} to="/" aria-label="Go home">
          <HomeIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 2,
          mb: 2,
          alignItems: "center",
        }}
      >
        {/* Date Range Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ width: "70%" }}>
            <DateRangePicker
              value={inputDateRange}
              onChange={(newValue) => setInputDateRange(newValue)}
              slots={{
                actionBar: PickersActionBar,
              }}
              slotProps={{
                actionBar: {
                  actions: ["accept"],
                },
              }}
            />
          </Box>
        </LocalizationProvider>

        {/* Input for passCapacity */}
        <Box sx={{ width: "30%" }}>
          <TextField
            label="Minimum Pass Capacity"
            type="number"
            inputProps={{ step: 0.01, min: 0, max: 1 }}
            value={inputPassCapacity}
            onChange={(e) => setInputPassCapacity(parseFloat(e.target.value))}
            fullWidth
          />
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => {
              // Reset to previous values
              setInputDateRange(dateRange);
              setInputPassCapacity(passCapacity);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdateParams}>
            OK
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "50%" }}>
          <DateHistogram data={[...reports]} />
          <ChannelHistogram data={[...reports]} />
        </Box>
        <Box sx={{ width: "50%" }}>
          <BatchTable reports={reports} />
        </Box>
      </Box>
    </Box>
  );
}

/**
 *
 * @param channelIds Node ID's of the channels to query
 * @param start Start Date of the query, fomratted as YYYY-MM-DD
 * @param end End Date of the query, formatted as YYYY-MM-DD
 * @param passCapacity Minimum capacity to be considered passing
 */
const useReports = (
  channelIds: string[],
  start: string,
  end: string,
  passCapacity: number
) => {
  const { reports } = useLazyLoadQuery<BatchTableQuery>(
    graphql`
      query BatchTableQuery(
        $channels: [ID!]!
        $start: Date!
        $end: Date!
        $passCapacity: Float!
      ) {
        reports(
          channels: $channels
          start: $start
          end: $end
          passCapacity: $passCapacity
        ) {
          channel {
            id
            name
          }
          batch {
            date
          }
          passRate
        }
      }
    `,
    { channels: channelIds, start, end, passCapacity }
  );
  return reports;
};
