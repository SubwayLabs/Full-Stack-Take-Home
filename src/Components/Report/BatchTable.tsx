
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from '@mui/material'

type Props = {
    reports: readonly {channel: {id: string, name:string}, batch: {date: string}, passRate: number}[]
}

export default function BatchTable({reports}: Props){
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Channel</TableCell>
                    <TableCell>Batch Date</TableCell>
                    <TableCell>Passing Rate</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    reports.map((report) => (
                        <TableRow key={report.channel.id + report.batch.date}>
                            <TableCell>{report.channel.name}</TableCell>
                            <TableCell>{report.batch.date}</TableCell>
                            <TableCell>{report.passRate}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}