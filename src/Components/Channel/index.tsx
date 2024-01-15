import * as React from 'react'
import {
    Box, Typography,
} from '@mui/material'
import {useParams} from 'react-router-dom'
//import { useChannels } from "../data"

import Report from '../Report'

export default function ChannelDetail(){
    const {channelId} = useParams<{channelId: string}>()
    const channels: any[] = []
    const channel = channels.find((channel) => channel.id === channelId)
    return (
        <Box>
            <Typography variant="h3">{channel?.name}</Typography>
            <Report channelIds={[channelId as string]} />
        </Box>
    )
}