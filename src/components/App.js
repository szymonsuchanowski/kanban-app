import React, { useReducer, useState } from 'react';
import tasksData from '../helpers/initTasksData';
import columnsData from '../helpers/columnsData';
import MODAL_TYPE from '../helpers/modalType';
import { EditContext, TasksContext } from '../context';
import Board from './Board';
import Modal from './Modal';

const App = () => {
    const initTasks = tasksData;

    const createNewTask = ({ name, owner }) => ({
        id: 1,
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

    const [tasks, dispatch] = useReducer(reducer, initTasks);
    const [modalData, setModalData] = useState({ show: false, type: null, contentId: null });

    const showModal = (modalType, contentId = null) =>
        setModalData({ show: true, type: modalType, contentId });
    const closeModal = () => setModalData({ show: false, type: null, contentId: null });

    const handleClick = () => {
        const [pendingCol] = columnsData;
        const pendingTasksQuantity = tasks.filter((task) => task.idColumn === pendingCol.id).length;
        if (pendingCol.limit === pendingTasksQuantity) {
            return showModal(MODAL_TYPE.FULL_PENDING);
        }
        return showModal(MODAL_TYPE.FORM);
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
                    <Board showModal={showModal} />
                    {modalData.show && <Modal modalData={modalData} closeModal={closeModal} />}
                </EditContext.Provider>
            </TasksContext.Provider>
        </div>
    );
};

export default App;
