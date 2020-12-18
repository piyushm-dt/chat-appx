import React, { useCallback } from 'react';
import { Button, Drawer, Icon, Alert } from 'rsuite';
import Dashboard from '.';
import { useModelState } from '../../misc/customHooks';
import { auth } from '../../misc/firebase';

function DashboardToggle() {
  const { isOpen, open, close } = useModelState();
  // const isMobile = useMediaQuery('(max-width: 992px)');

  const onSignOut = useCallback(() => {
    auth.signOut();
    Alert.info('Signed out', 4000);
    close();
  }, [close]);

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
}

export default DashboardToggle;
