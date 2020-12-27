import React from 'react'
import { Modal } from 'rsuite';
import { useModelState } from '../../../misc/customHooks'

function ImgBtnModel({src, fileName}) {
    const {isOpen, open, close} = useModelState();
    return (
        <>
        <input type="image" src={src}
        alt="file"
        onClick={open} className="mw-100 mh-100 w-auto"
        />
        <Modal show={isOpen} onHide={close}>
            <Modal.Header>
                <Modal.Title>
                    {fileName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={src} height="100%" width="100%" alt="file"/>
            </Modal.Body>
            <Modal.Footer>
                <a href={src} target="blank" rel="noopener noreferrer">
                    View Original
                </a>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default ImgBtnModel
