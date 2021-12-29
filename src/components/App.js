import React, { useReducer, useState } from 'react';
import tasksData from '../helpers/initTasksData';
import columnsData from '../helpers/columnsData';
import MODAL_TYPE from '../helpers/MODAL_TYPE';
import { EditContext, TasksContext } from '../context';
import Board from './Board';
import Modal from './Modal';

const App = () => {
    const initTasks = tasksData;
    const reducer = (tasks, action) => {
        const { type } = action;
        switch (type) {
            default:
                return tasks;
        }
    };

    const [tasks, dispatch] = useReducer(reducer, initTasks);
    const [modalData, setModalData] = useState({ show: false, type: null });

    const showModal = (modalType) => setModalData({ show: true, type: modalType });

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
                    {modalData.show && <Modal modalData={modalData} closeModal={setModalData} />}
                </EditContext.Provider>
            </TasksContext.Provider>
        </div>
    );
};

export default App;
