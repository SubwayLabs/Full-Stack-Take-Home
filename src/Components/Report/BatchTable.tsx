import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  reports: readonly {
    channel: { id: string; name: string };
    batch: { date: string };
    passRate: number;
  }[];
};

export default function BatchTable({ reports }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialOrderBy =
    (searchParams.get("orderBy") as "date" | "passRate") ?? "date";
  const initialOrder = (searchParams.get("order") as "asc" | "desc") ?? "asc";
  const initialPage = parseInt(searchParams.get("page") ?? "0", 10);
  const initialRowsPerPage = parseInt(searchParams.get("rows") ?? "10", 10);

  const [orderBy, setOrderBy] = useState<"date" | "passRate">(initialOrderBy);
  const [order, setOrder] = useState<"asc" | "desc">(initialOrder);
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("orderBy", orderBy);
    newParams.set("order", order);
    newParams.set("page", page.toString());
    newParams.set("rows", rowsPerPage.toString());
    setSearchParams(newParams);
  }, [orderBy, order, page, rowsPerPage, searchParams, setSearchParams]);

  const handleSort = (column: "date" | "passRate") => {
    if (orderBy === column) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(column);
      setOrder("asc");
    }
    setPage(0); // reset page when sort changes
  };

  const sortedReports = useMemo(() => {
    return [...reports].sort((a, b) => {
      const getValue = (report: typeof a) => {
        if (orderBy === "date") return new Date(report.batch.date).getTime();
        if (orderBy === "passRate") return report.passRate;
        return 0;
      };

      return order === "asc"
        ? getValue(a) - getValue(b)
        : getValue(b) - getValue(a);
    });
  }, [reports, orderBy, order]);

  const paginatedReports = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedReports.slice(start, start + rowsPerPage);
  }, [sortedReports, page, rowsPerPage]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 600 }}>Channel</TableCell>
          <TableCell
            sortDirection={orderBy === "date" ? order : false}
            sx={{ fontWeight: 600 }}
          >
            <TableSortLabel
              active={orderBy === "date"}
              direction={order}
              onClick={() => handleSort("date")}
            >
              Batch Date
            </TableSortLabel>
          </TableCell>
          <TableCell
            sortDirection={orderBy === "passRate" ? order : false}
            sx={{ fontWeight: 600 }}
            align="right"
          >
            <TableSortLabel
              active={orderBy === "passRate"}
              direction={order}
              onClick={() => handleSort("passRate")}
            >
              Passing Rate
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {paginatedReports.map((report) => (
          <TableRow
            key={report.channel.id + report.batch.date}
            sx={{
              backgroundColor: (theme) =>
                paginatedReports.indexOf(report) % 2 === 0
                  ? "#fafafa"
                  : "white",
              "&:hover": {
                backgroundColor: "#f0f8ff",
              },
            }}
          >
            <TableCell>{report.channel.name}</TableCell>
            <TableCell>{report.batch.date}</TableCell>
            <TableCell align="right">
              {(report.passRate * 100).toFixed(0)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TablePagination
        component="div"
        count={reports.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0); // Reset to first page
        }}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Table>
  );
}
