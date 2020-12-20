import React from 'react'
import CreateRoomBtnModel from './CreateRoomBtnModel'
import DashboardToggle from './dashboard/DashboardToggle'

function Sidebar() {
    return (
        <div className="h-100 pt-2">
            <div>
                <DashboardToggle />
                <CreateRoomBtnModel/>
            </div>
        </div>
    )
};

export default Sidebar;
