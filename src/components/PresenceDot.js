import React from 'react'
import { Badge, Tooltip, Whisper } from 'rsuite';
import { usePresence } from '../misc/customHooks'

const getColor = (presence) => {
    if(!presence) return 'gray';

    switch(presence){
        case 'online': return 'green';
        case 'offline': return 'red';
        default: return 'red';
    }
};

const getText = (presence) => {
    if(!presence) return 'Unknown';
    return presence.state === 'online' ?'Online' : `Last seen at ${new Date(presence.last_changed).toLocaleDateString()}` 
}

function PresenceDot({uid}) {
    const presence = usePresence(uid);
    return (
        <Whisper placement="top" trigger="hover" 
        speaker={
        <Tooltip>
        {getText(presence)}
        </Tooltip>
        }>
            <Badge className="cursor-pointer" style={{backgroundColor: getColor(presence)}} />
        </Whisper>
    )
}

export default PresenceDot
