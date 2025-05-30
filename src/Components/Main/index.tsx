import {
  Box,
  Button,
  Checkbox,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import graphql from "babel-plugin-relay/macro";
import * as React from "react";
import { useLazyLoadQuery } from "react-relay";
import type { MainQuery } from "./__generated__/MainQuery.graphql";

import { Link, useNavigate } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  visibility: "hidden",
  opacity: 0,
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: 500,
  "&:hover": {
    textDecoration: "underline",
  },
}));

export default function Main() {
  const { channels } = useLazyLoadQuery<MainQuery>(
    graphql`
      query MainQuery {
        channels {
          edges {
            node {
              id
              name
              status
            }
          }
        }
      }
    `,
    {}
  );
  const [selected, setSelected] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        mb={2}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "white",
          py: 2,
        }}
      >
        <Typography variant="h4">Channels</Typography>
        <Tooltip title="Select 1 or More Channels to View Report">
          <Box>
            <Button
              onClick={() => {
                setLoading(true);
                navigate(
                  `/bulk_report?channelId=${selected.join("&channelId=")}`
                );
              }}
              disabled={selected.length === 0 || loading}
              variant="contained"
              color="primary"
            >
              View Report
            </Button>
          </Box>
        </Tooltip>
      </Stack>
      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Channel
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight="bold">
                  View
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {channels?.edges.map((edge, index) => {
              if (!edge?.node) return null;
              const channel = edge.node;
              return (
                <TableRow
                  key={channel.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                    "&:hover .view-link": {
                      visibility: "visible",
                      opacity: 1,
                    },
                    "&:hover": {
                      backgroundColor: "#f0f8ff",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Checkbox
                        checked={selected.includes(channel.id)}
                        onChange={() => {
                          if (selected.includes(channel.id)) {
                            setSelected(
                              selected.filter((id) => id !== channel.id)
                            );
                          } else {
                            setSelected([...selected, channel.id]);
                          }
                        }}
                      />
                      <Typography variant="body2">{channel.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={
                        channel.status === "R" ? "success.main" : "error.main"
                      }
                    >
                      {channel.status === "R" ? "Running" : "Stopped"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StyledLink
                      to={`/channel/${channel.id}`}
                      className="view-link"
                    >
                      View
                    </StyledLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
