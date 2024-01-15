import * as React from 'react'
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    TableFooter,
    Button,
    Checkbox,
    Tooltip
} from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'
import graphql from 'babel-plugin-relay/macro';
import type { MainQuery } from './__generated__/MainQuery.graphql'

import { Link, useNavigate } from 'react-router-dom'



export default function Main(){
    const {channels} = useLazyLoadQuery<MainQuery>(graphql`
        query MainQuery{
            channels{
                edges{
                    node{
                        id
                        name
                        status
                    }
                }
            }
        }
    `, {})
    const [selected, setSelected] = React.useState<string[]>([])
    const navigate = useNavigate()
    
    return (
        <>
            <div>
                <h1>Channels</h1>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Channel</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>View</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {channels?.edges.map((edge) => {
                        if(!edge?.node) return null
                        const channel = edge.node
                        return (
                            <TableRow key={channel.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selected.includes(channel.id)}
                                        onChange={() => {
                                            if (selected.includes(channel.id)){
                                                setSelected(selected.filter((id) => id !== channel.id))
                                            } else {
                                                setSelected([...selected, channel.id])
                                            }
                                        }}
                                    />
                                    {channel.name}
                                </TableCell>
                                <TableCell>{channel.status === "R" ? "Running" : "Stopped"}</TableCell>
                                <TableCell><Link to={`/channel/${channel.id}`}>View</Link></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <Tooltip title="Select 1 or More Channels to View Report">
                        <span>
                            <Button
                                onClick={() => navigate(`/bulk_report?channelId=${selected.join('&channelId=')}`)}
                            >
                                View Report
                            </Button>
                        </span>
                    </Tooltip>
                </TableFooter>
            </Table>
        </>
    )
}