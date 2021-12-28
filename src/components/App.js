import React, { useReducer, useState } from 'react';
import tasksData from '../helpers/initTasksData';
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
    const [modalData, setModalData] = useState({ show: false, case: null });

    const toggleModal = () => setModalData({ ...modalData, ...{ show: true } });

    return (
        <div className="app">
            <div className="app__bar bar">
                <header className="bar__header">team board</header>
                <button
                    className="bar__btn"
                    onClick={() => toggleModal()}
                    title="create new task"
                    type="button"
                >
                    new task
                </button>
            </div>
            <TasksContext.Provider value={tasks}>
                <EditContext.Provider value={dispatch}>
                    <Board />
                    {modalData.show && <Modal modalData={modalData} onClick={setModalData} />}
                </EditContext.Provider>
            </TasksContext.Provider>
        </div>
    );
};

export default App;
