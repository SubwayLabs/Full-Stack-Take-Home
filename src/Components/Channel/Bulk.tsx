import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import Report from "../Report";

export default function BulkChannel() {
  const { search } = useLocation();
  const channelIds = new URLSearchParams(search).getAll("channelId");
  return (
    <Box>
      <Report channelIds={channelIds} />
    </Box>
  );
}
