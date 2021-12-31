import React, { useState } from 'react';
import Modal from '../components/Modal';

function useModal(DefaultContent = null, showDefault = false) {
    const [show, setShow] = useState(showDefault);
    const [Content, setContent] = useState(DefaultContent);

    const showModal = () => setShow(true);

    const closeModal = () => setShow(false);

    const getComponent = () => {
        const Component = <Modal closeModal={closeModal}>{Content}</Modal>;
        return show ? Component : null;
    };

    return [getComponent, showModal, closeModal, setContent];
}

export default useModal;
