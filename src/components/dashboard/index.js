import React from 'react';
import { Drawer, Button, Divider, Alert } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import { getUserUpdate } from '../../misc/Helper';
import AvatarUploadBtn from './AvatarUploadBtn';
import EditableInput from './EditableInput';
import ProviderBlock from './ProviderBlock';

function Dashboard({ onSignOut }) {
  const { profile } = useProfile();

  const onSave = async (newData) => {
  
    try {
      const updates = await getUserUpdate(profile.uid, 'name', newData, database);
      await database.ref().update(updates);
      Alert.success('Nickname updated');
    } catch (err) {
      Alert.err(err.message, 4000);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3> Hey, {profile.name} </h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">NickName</h6>}
        />
        <AvatarUploadBtn/>
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
}

export default Dashboard;
