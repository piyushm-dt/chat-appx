import React, { memo } from 'react'
import { Button, Modal } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context'
import { useModelState } from '../../../misc/customHooks';

function RoomInfoBtnModel() {

    const { isOpen, close, open} = useModelState();
    const description = useCurrentRoom(val => val.description);
    const name = useCurrentRoom(val => val.name);

    return (
        <>
            <Button apperance="link" className="px-0" onClick={open}>
                Room Information
            </Button>
            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    About {name}
                </Modal.Header>
                <Modal.Body>
                    <h6 className="mb-1">
                        Desription
                    </h6>
                    <p>{description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button block onClick={close}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(RoomInfoBtnModel);
