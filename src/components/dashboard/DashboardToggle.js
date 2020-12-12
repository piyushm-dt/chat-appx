import React from 'react'
import { Button, Drawer, Icon } from 'rsuite'
import { useModelState, useMediaQuery } from '../../misc/customHooks';
import Dashboard from '.';

function DashboardToggle() {
    const {isOpen, open, close} = useModelState();
    const isMobile = useMediaQuery('(max-width: 992px)');
    return (
        <>
         <Button block color="blue" onClick={open}>
             <Icon icon="dashboard" /> Dashboard
             </Button>
             <Drawer full={isMobile} show={isOpen} onHide={close} palcement="left">
                 <Dashboard />
             </Drawer>
        </>
    )
}

export default DashboardToggle
