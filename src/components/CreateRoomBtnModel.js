import React, { useCallback, useRef, useState } from 'react';
import firebase from 'firebase/app'
import { Alert, Button, ControlLabel, Form, FormControl, FormGroup, Icon, Modal, Schema } from 'rsuite'
import { useModelState } from '../misc/customHooks'
import { database } from '../misc/firebase';

const { StringType } = Schema.Types;

const model = Schema.Model({
    name: StringType().isRequired('Chat name is required !'),
    description: StringType().isRequired('Description is needed'),
})

const INITIAL_FORM = {
    name:'',
    description:''
}

function CreateRoomBtnModel() {

    const {isOpen, open, close} = useModelState();

    const [formValue, setFormValue ] = useState(INITIAL_FORM);
    const [isLoading, setIsLoading ] = useState(false);
    const formRef = useRef();
    const onFormChange = useCallback(value =>{
        setFormValue(value);
    }, []);

    const onSubmit = async () => {
        if(!formRef.current.check()){
            return;
        }
        setIsLoading(true);
        const newRoomData = {
            ...formValue,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        }
        try {
            await database.ref('rooms').push(newRoomData);
            setIsLoading(false);
            setFormValue(INITIAL_FORM);
            close();
            Alert.info('Changes done', 4000);
        } catch(err){
            setIsLoading(false);
            Alert.error(err.message, 4000);
        }
    }

    return (
        <div className="mt-1">
            <Button block color="violet" onClick={open}>
                <Icon icon="creative"/>Create new chat room!
            </Button>
            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title> New Chat Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form fluid 
                    onChange={onFormChange} 
                    formValue={formValue} 
                    model={model}
                    ref = {formRef}
                    >
                        <FormGroup>
                            <ControlLabel>Room Name</ControlLabel>
                            < FormControl name="name" placeholder="Enter chat room name.."/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl componentClass="textarea" row={5} name="description" placeholder="Enter room description .." />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button block appearance="primary" onClick={onSubmit} disabled={isLoading}>
                        New Chat Room
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreateRoomBtnModel
