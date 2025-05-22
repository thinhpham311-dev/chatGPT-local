'use client'
import React from 'react'
import { Button } from '@/components'
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";



interface modalProps {
    buttonText?: string,
    buttonIcon?: React.ReactNode,
    modalTitle?: string,
    modalContent?: string,
    func?: Function
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


const ModalConfirm = ({ buttonText, buttonIcon, modalContent, modalTitle, func }: modalProps) => {


    const [modalIsOpen, setIsOpen] = React.useState(false);

    const openModal = () => {
        setIsOpen(true);
    }


    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <Button type="button" onClick={openModal}>{buttonIcon}<span>{buttonText}</span></Button>
            <Modal
                isOpen={modalIsOpen}
                shouldCloseOnOverlayClick={true}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel={modalTitle}
            >
                <div tw="flex items-center justify-between">
                    <span tw="font-bold">{modalTitle}</span>
                    <button onClick={closeModal} className="modal-close"><IoMdClose /></button>
                </div>
                <div tw="py-3">
                    <p>{modalContent}</p>
                </div>
                <div tw="flex items-center justify-center">
                    <Button type="button" $variant='dark' onClick={func as any}><FaRegCheckCircle /><span>Agree</span></Button>
                </div>
            </Modal>
        </div>
    );

}

export default ModalConfirm
