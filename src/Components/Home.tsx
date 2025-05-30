import { Box } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Channel from "./Channel";
import BulkChannel from "./Channel/Bulk";
import Main from "./Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "channel/:channelId",
    element: <Channel />,
  },
  {
    path: "bulk_report",
    element: <BulkChannel />,
  },
]);

function Home() {
  return (
    <div className="App">
      <Box sx={{ width: "80%", mx: "auto" }}>
        <RouterProvider router={router} />
      </Box>
    </div>
  );
}

export default Home;
