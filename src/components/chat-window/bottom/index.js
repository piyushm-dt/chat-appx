import React, { useCallback, useState } from 'react'
import firebase from 'firebase/app'
import { useParams } from 'react-router';
import { InputGroup, Input, Icon, Alert } from 'rsuite';
import { database } from '../../../misc/firebase';
import { useProfile } from '../../../context/profile.context';

function assembleMessage(profile, chatId) {
    return {
        roomId: chatId,
        author: {
            name: profile.name,
            uid: profile.uid,
            createdAt: profile.createdAt,
            ...(profile.avatar ? {avatar: profile.avatar} : {})
        },
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        likeCount: 0,
    }
}

function Bottom() {

    const [input, setInput] = useState('');
    const { chatId } = useParams();
    const { profile } = useProfile();
    const [isLoading, setIsLoading ] = useState(false);

    const onInputChange = useCallback((value) => {
        setInput(value);
    },[]);

    const onSendClick = async () => {
        if(input.trim() === '') {
            return;
        }

        const msgData = assembleMessage(profile, chatId);

        msgData.text = input;
        const updates = {};
        const messageId = database.ref('messages').push().key;
        updates[`/messages/${messageId}`] = msgData;
        updates[`/rooms/${chatId}/lastMessage`] = {
            ...msgData,
            msgId: messageId,
        };

        setIsLoading(true);
        try{
            await database.ref().update(updates);
            setInput('');
            setIsLoading(false);
        }
        catch(err){
            Alert.error(err.message, 4000);
            setIsLoading(false);
        }
    };

    const onKeyDown = (ev) => {
        if(ev.keyCode === 13){
            ev.preventDefault();
            onSendClick();
        }
    }

    return (
        <div>
            <InputGroup>
            <Input placeholder="write message..." 
            value={input} onChange={onInputChange}
            onKeyDown={onKeyDown}
             />
            <InputGroup.Button 
            color="green" appearance="primary" 
            onClick={onSendClick}
            disabled={isLoading}
            >
                <Icon icon="send" />
            </InputGroup.Button>
            </InputGroup>
        </div>
    )
}

export default Bottom
