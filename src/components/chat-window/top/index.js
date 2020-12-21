import React, { memo } from 'react'
import { Link } from 'react-router-dom';
import { ButtonToolbar, Icon } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context'
import { useMediaQuery } from '../../../misc/customHooks';
import RoomInfoBtnModel from './RoomInfoBtnModel';

function Top() {
    const name = useCurrentRoom(val => val.name);
    const isMobile = useMediaQuery('(max-width: 992px)');

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-disappear d-flex align-items-center">
                    <Icon
                    componentClass={Link} to="/" 
                    icon="arrow-circle-left" size="2x"
                    className={isMobile ? 'd-inline-block p-0 mr-2 text-gold link-unstyled' : 'd-none'}
                    />
                    <span className="text-disapper">{name}</span>  
                </h4>
                <ButtonToolbar className="ws-nowrap">todo</ButtonToolbar>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <span>todo</span>
                <RoomInfoBtnModel />
            </div>
        </div>
    )
}

export default memo(Top);
