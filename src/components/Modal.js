import React from 'react';

const Modal = (props) => {
    const { children, closeModal } = props;

    const handleClick = (e) => (e.target.classList.contains('modal') ? closeModal() : null);

    return (
        <div className="board__modal modal" onClick={handleClick} aria-hidden>
            <div className="modal__content">
                <div className="modal__bar">
                    <button className="modal__btn" type="button" onClick={() => closeModal()}>
                        close modal
                    </button>
                </div>
                <div className="modal__container">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
