import React from 'react';
import MODAL_TYPE from '../helpers/MODAL_TYPE';

const Modal = (props) => {
    const { closeModal, modalData } = props;

    const rednerModalContent = () => {
        const { type } = modalData;
        if (type === MODAL_TYPE.FORM) {
            return <p>form</p>;
        }
        if (type === MODAL_TYPE.FULL_PENDING) {
            return <p>full pending</p>;
        }
        if (type === MODAL_TYPE.FULL_NEXT_COL) {
            return <p>full next col</p>;
        }
        if (type === MODAL_TYPE.FULL_PREV_COL) {
            return <p>full prev col</p>;
        }
        if (type === MODAL_TYPE.CLEAR_BOARD) {
            return <p>clear board</p>;
        }
        return null;
    };

    const handleClick = (e) => {
        if (e.target.classList.contains('modal__overlay')) {
            closeModal({ show: false, case: null });
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
                <button type="button" onClick={() => closeModal({ show: false, case: 1 })}>
                    close modal
                </button>
                <div>{rednerModalContent()}</div>
            </div>
        </div>
    );
};

export default Modal;
