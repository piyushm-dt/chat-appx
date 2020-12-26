import React, { memo } from 'react'
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useHover, useMediaQuery } from '../../../misc/customHooks';
import { auth } from '../../../misc/firebase';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import PresenceDot from '../../PresenceDot';
import IconBtnControl from './IconBtnControl';
import ProfileInfoBtnModel from './ProfileInfoBtnModel';

function MessageItem({message, handleAdmin, handleLike, handleDelete}) {
    const { author, createdAt, text, likes, likeCount} = message;

    const [selfRef, isHover] = useHover();
    const isMobile = useMediaQuery(('(max-width: 992px)'));

    const isAdmin = useCurrentRoom(v => v.isAdmin);
    const admins = useCurrentRoom(v => v.admins);

    const isMsgAuthorAdmin = admins.includes(author.uid);

    const isAuthor = auth.currentUser.uid === author.uid;

    const canShowicons = isMobile || isHover ;
    const canGrantAdmin = isAdmin && !isAuthor;
    const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);


    return (
      <li
        className={`padded mb-1 cursor-pointer ${isHover ? 'bg-black-02' : ''}`}
        ref={selfRef}
      >
        <div className="d-flex align-items-center font-bolder mb-1">
          <PresenceDot uid={author.uid} />
          <ProfileAvatar
            src={author.avatar}
            name={author.name}
            className="ml-1"
            size="xs"
          />
          <ProfileInfoBtnModel
            profile={author}
            appearance="link"
            className="p-0 ml-1 text-black"
          >
            {canGrantAdmin && (
              <Button
                block
                onClick={() => handleAdmin(author.uid)}
                color="blue"
              >
                {isMsgAuthorAdmin ? 'remove as admin' : 'make admin'}
              </Button>
            )}
          </ProfileInfoBtnModel>
          <TimeAgo
            datetime={createdAt}
            className="font-normal text-black-50 ml-2"
          />
          <IconBtnControl
            {...(isLiked ? { color: 'orange' } : {})}
            isVisible={canShowicons}
            iconName="heart"
            tooltip="Like"
            onClick={() => handleLike(message.id)}
            badgeContent={likeCount}
          />
          {isAuthor && (
            <IconBtnControl
              isVisible={canShowicons}
              iconName="close"
              tooltip="Delete"
              onClick={() => handleDelete(message.id)}
            />
          )
        }
        </div>
        <div>
          <span className="word-break-all">{text}</span>
        </div>
      </li>
    );
   
}

export default memo(MessageItem)
