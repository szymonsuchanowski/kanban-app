import React from 'react';

const Modal = (props) => {
    const { children, closeModal } = props;

    const handleClick = (e) => (e.target.classList.contains('modal') ? closeModal() : null);

    return (
        <div
            className="board__modal modal"
            onClick={handleClick}
            aria-hidden
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
            <div className="modal__content" style={{ width: '60%' }}>
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
