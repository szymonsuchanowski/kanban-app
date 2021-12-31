import React, { useContext } from 'react';
import { EditContext } from '../context';
import { TASKS_ACTIONS } from '../helpers/actions';

const Confirmation = (props) => {
    const { closeModal, id = null, taskName = null } = props;

    const editTasks = useContext(EditContext);

    const paragraphContent = id ? `Delete task ${taskName}?` : 'Clear the board?';

    const clearBoard = () => {
        editTasks({ type: TASKS_ACTIONS.CLEAR_BOARD });
        return closeModal();
    };

    const removeTask = () => {
        editTasks({ type: TASKS_ACTIONS.REMOVE, payload: id });
        return closeModal();
    };

    const handleRemove = () => (id ? removeTask() : clearBoard());

    return (
        <>
            <p className="modal__paragraph">{paragraphContent}</p>
            <div className="modal__actions">
                <button
                    className="modal__btn modal__btn--confirm"
                    onClick={handleRemove}
                    type="button"
                >
                    yes
                </button>
                <button
                    className="modal__btn modal__btn--cancel"
                    onClick={() => closeModal()}
                    type="button"
                >
                    no
                </button>
            </div>
        </>
    );
};

export default Confirmation;
