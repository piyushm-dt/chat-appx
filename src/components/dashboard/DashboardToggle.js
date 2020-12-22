import React, { useCallback } from 'react';
import { Button, Drawer, Icon, Alert } from 'rsuite';
import Dashboard from '.';
import { useModelState, useMediaQuery } from '../../misc/customHooks';
import { auth, database } from '../../misc/firebase';
import { isOfflineForDatabase } from "../../context/profile.context";

function DashboardToggle() {
  const { isOpen, open, close } = useModelState();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const onSignOut = useCallback(() => {
    database.ref(`/status/${auth.currentUser.uid}`).set(isOfflineForDatabase).then(() =>{
      auth.signOut();
      Alert.info('Signed Out');
      close();
    }).catch(err => {
      Alert.error(err.message, 4000);
    });
  }, [close]);

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
}

export default DashboardToggle;
