import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { database } from '../../../misc/firebase';
import { transformToArrWithId } from '../../../misc/Helper';
import MessageItem from './MessageItem';

function Messages() {
     const { chatId } = useParams();
     const [messages, setMessages] = useState(null);

     const isChatEmpty = messages && messages.length === 0;
     const canShowMessages = messages && messages.length > 0;

     useEffect(() => {
       const messagesRef = database.ref('/messages');

       messagesRef
         .orderByChild('roomId')
         .equalTo(chatId)
         .on('value', snap => {
           const data = transformToArrWithId(snap.val());

           setMessages(data);
         });
       return () => {
         messagesRef.off('value');
       };
     }, [chatId]);

     const handleAdmin = useCallback(async (uid) => {
       const adminRef = database.ref(`/rooms/${chatId}/admins`);

       await adminRef.transaction(admins => {
         if(admins) {
           if(admins[uid]) {
             admins[uid]=null;
           }
           else{
             admins[uid]=true;
           }
         }
         return admins;
       });
       Alert.info('Access changed', 4000);

      },[chatId]);

     return (
       <ul className="msg-list custom-scroll">
         {isChatEmpty && <li>Not messages yet</li>}
         {canShowMessages &&
           messages.map(msg => <MessageItem key={msg.id} message={msg} handleAdmin={handleAdmin}  />)}
       </ul>
     );
}

export default Messages
