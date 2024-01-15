import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import { Box } from '@mui/material';

import Main from './Main'
import Channel from './Channel'
import BulkChannel from './Channel/Bulk';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Main />
    ),
  },
  {
    path: "channel/:channelId",
    element: <Channel />,
  },
  {
    path: 'bulk_report',
    element: <BulkChannel />
  }
]);

function Home() {
  return (
    <div className="App">
    <Box sx={{width: '80%', mx: 'auto'}}>
        <RouterProvider router={router} />
    </Box>
    </div>
  );
}

export default Home;
