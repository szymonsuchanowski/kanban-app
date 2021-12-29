import React, { useReducer, useState } from 'react';
import { v4 as uuid } from 'uuid';
import MODAL_TYPE from '../helpers/modalType';
import { EditContext, TasksContext } from '../context';
import columns from '../helpers/columnsData';
import Board from './Board';
import Modal from './Modal';

const Kanban = () => {
    const createNewTask = ({ name, owner }) => ({
        id: uuid(),
        name,
        owner,
        isDoing: false,
        idColumn: 1,
    });

    const reducer = (tasks, action) => {
        const { type } = action;
        switch (type) {
            case 'add': {
                console.log(action.payload);
                return [...tasks, createNewTask(action.payload.taskData)];
            }
            default:
                return tasks;
        }
    };

    const [tasks, dispatch] = useReducer(reducer, []);

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
            ? showModal(MODAL_TYPE.FULL_PENDING)
            : showModal(MODAL_TYPE.FORM);
    };

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
            </div>
            <TasksContext.Provider value={tasks}>
                <EditContext.Provider value={dispatch}>
                    <Board showModal={showModal} columns={columns} />
                    {modalData.show && <Modal modalData={modalData} closeModal={closeModal} />}
                </EditContext.Provider>
            </TasksContext.Provider>
        </div>
    );
};

export default Kanban;
