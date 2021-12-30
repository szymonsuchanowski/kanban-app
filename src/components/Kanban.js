import React, { useReducer, useState } from 'react';
import MODAL_TYPE from '../helpers/modalType';
import { EditContext, TasksContext } from '../context';
import columns from '../data/columnsData';
import { tasksReducer } from '../reducers';
import Board from './Board';
import Modal from './Modal';

const Kanban = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, []);

    const initModalData = {
        show: false,
        type: null,
        contentId: null,
    };

    const [modalData, setModalData] = useState(initModalData);

    const showModal = (modalType, contentId = null) =>
        setModalData({ show: true, type: modalType, contentId });

    const closeModal = () => setModalData(initModalData);

    const handleClick = () => {
        const [pendingCol] = columns;
        const { limit } = pendingCol;
        const pendingTasksQuantity = tasks.filter((task) => task.idColumn === pendingCol.id).length;
        return limit === pendingTasksQuantity
            ? showModal(MODAL_TYPE.FULL_COLUMN, pendingCol.id)
            : showModal(MODAL_TYPE.FORM);
    };

    const handleClear = () => showModal(MODAL_TYPE.CLEAR_BOARD);

    return (
        <div className="app">
            <div className="app__bar bar">
                <header className="bar__header">team board</header>
                <button
                    className="bar__btn"
                    onClick={handleClick}
                    title="create new task"
                    type="button"
                >
                    new task
                </button>
                <button
                    className="bar__btn"
                    onClick={handleClear}
                    title="clear board"
                    type="button"
                    disabled={tasks.length === 0}
                >
                    clear board
                </button>
            </div>
            <TasksContext.Provider value={tasks}>
                <EditContext.Provider value={dispatch}>
                    <Board showModal={showModal} />
                    {modalData.show && <Modal modalData={modalData} closeModal={closeModal} />}
                </EditContext.Provider>
            </TasksContext.Provider>
        </div>
    );
};

export default Kanban;
