import { useLazyLoadQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import {Box} from '@mui/material'

import BatchTable from './BatchTable';
import type {BatchTableQuery} from './__generated__/BatchTableQuery.graphql'

type Props = {
    channelIds: string[]
}



export default function Report({channelIds}: Props){
    const reports = useReports(channelIds, '2025-05-01', "2025-05-31", 0.9)
    return (
        <Box sx={{py: 4}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Box>
                    <h5>Chart Place Holder</h5>
                </Box>
                <Box>
                    <BatchTable reports={reports} />
                </Box>
            </Box>
        </Box>
    )
}

/**
 * 
 * @param channelIds Node ID's of the channels to query
 * @param start Start Date of the query, fomratted as YYYY-MM-DD
 * @param end End Date of the query, formatted as YYYY-MM-DD
 * @param passCapacity Minimum capacity to be considered passing
 */
const useReports = (channelIds: string[], start: string, end: string, passCapacity: number) => {
    const {reports} = useLazyLoadQuery<BatchTableQuery>(graphql`
        query BatchTableQuery($channels: [ID!]!, $start: Date!, $end: Date!, $passCapacity: Float!){
            reports(channels: $channels, start: $start, end: $end, passCapacity: $passCapacity){
                channel{
                    id
                    name
                }
                batch{
                    date
                }
                passRate
            }
        }
    `, {channels: channelIds, start, end, passCapacity})
    return reports
}