import React from 'react';
import './Modal.css';

const Modal = (props) => {
    const { children, closeModal } = props;

    const handleClick = (e) => (e.target.classList.contains('modal') ? closeModal() : null);

    return (
        <div className="board__modal modal" onClick={handleClick} aria-hidden>
            <div className="modal__content">
                <button
                    className="modal__btn"
                    title="close window"
                    type="button"
                    onClick={() => closeModal()}
                >
                    &#x2715;
                </button>
                <div className="modal__container">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
