import React from 'react';
import MODAL_TYPE from '../helpers/modalType';
import Form from './Form';

const Modal = (props) => {
    const { closeModal, modalData } = props;

    const modalContent = {
        [MODAL_TYPE.FORM]: <Form closeModal={closeModal} />,
        [MODAL_TYPE.FULL_PENDING]: <p>full pending</p>,
        [MODAL_TYPE.FULL_NEXT_COL]: <p>full next</p>,
        [MODAL_TYPE.FULL_PREV_COL]: <p>full prev</p>,
        [MODAL_TYPE.REMOVE_TASK]: <p>xyz</p>,
        [MODAL_TYPE.CLEAR_BOARD]: <p>xyz</p>,
    };

    const rednerModalContent = () => {
        const { type } = modalData;
        return modalContent[type];
    };

    const handleClick = (e) => {
        if (e.target.classList.contains('modal__overlay')) {
            closeModal();
        }
    };

    return (
        <div
            className="modal__overlay"
            aria-hidden
            onClick={handleClick}
            style={{
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                position: 'absolute',
                background: 'grey',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div style={{ width: '60%' }}>
                <p>Modal</p>
                <button type="button" onClick={() => closeModal()}>
                    close modal
                </button>
                <div>{rednerModalContent()}</div>
            </div>
        </div>
    );
};

export default Modal;
