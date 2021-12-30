import React, { useContext } from 'react';
import { ColumnsContext, EditContext, TasksContext } from '../context';
import { TASKS_ACTIONS } from '../helpers/actions';
import MODAL_TYPE from '../helpers/modalType';
import Form from './Form';

const Modal = (props) => {
    const {
        closeModal,
        modalData: { type, contentId },
    } = props;

    const columns = useContext(ColumnsContext);
    const tasks = useContext(TasksContext);
    const editTasks = useContext(EditContext);

    const renderFullColumnInfo = () => {
        if (contentId && type === MODAL_TYPE.FULL_COLUMN) {
            const [column] = columns.filter((col) => col.id === contentId);
            const { name } = column;
            return <p>Ooops, column {name} is full!</p>;
        }
        return null;
    };

    const handleRemove = () => {
        editTasks({ type: TASKS_ACTIONS.REMOVE, payload: contentId });
        closeModal();
    };

    const renderTaskRemoveConfirm = () => {
        if (contentId && type === MODAL_TYPE.REMOVE_TASK) {
            const [selectedTask] = tasks.filter((task) => task.id === contentId);
            const { name } = selectedTask;
            return (
                <div>
                    <p>Do you want remove task {name}?</p>
                    <button type="button" onClick={handleRemove}>
                        yes
                    </button>
                    <button type="button" onClick={() => closeModal()}>
                        no
                    </button>
                </div>
            );
        }
        return null;
    };

    const handleClear = () => {
        editTasks({ type: TASKS_ACTIONS.CLEAR_BOARD });
        closeModal();
    };

    const renderClearBoardConfirm = () => (
        <div>
            <p>Do you want to clear board?</p>
            <button type="button" onClick={handleClear}>
                yes
            </button>
            <button type="button" onClick={() => closeModal()}>
                no
            </button>
        </div>
    );

    const modalContent = {
        [MODAL_TYPE.FORM]: <Form closeModal={closeModal} />,
        [MODAL_TYPE.FULL_COLUMN]: renderFullColumnInfo(),
        [MODAL_TYPE.REMOVE_TASK]: renderTaskRemoveConfirm(),
        [MODAL_TYPE.CLEAR_BOARD]: renderClearBoardConfirm(),
    };

    const rednerModalContent = () => modalContent[type];

    const handleClick = (e) =>
        e.target.classList.contains('modal__overlay') ? closeModal() : null;

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
