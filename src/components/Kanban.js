import React, { useReducer } from 'react';
import columns from '../data/columnsData';
import { EditContext, TasksContext } from '../context';
import { tasksReducer } from '../reducers';
import { useModal } from '../hooks';
import { getColumnTasksQuantity, setFullColumnInfo } from '../helpers/helpersFunctions';
import Board from './Board';
import Form from './Form';
import Confirmation from './Confirmation';

const Kanban = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [ModalWithContent, showModal, closeModal, setContent] = useModal();

    const showFullColumnInfo = (name) => {
        setContent(setFullColumnInfo(name));
        showModal();
    };

    const openForm = () => {
        setContent(<Form closeModal={closeModal} />);
        showModal();
    };

    const handleTaskAdding = () => {
        const [pendingCol] = columns;
        const { limit, id, name } = pendingCol;
        const pendingTasksQuantity = getColumnTasksQuantity(tasks, id);
        return limit === pendingTasksQuantity ? showFullColumnInfo(name) : openForm();
    };

    const handleClear = () => {
        setContent(<Confirmation closeModal={closeModal} />);
        showModal();
    };

    return (
        <div className="app">
            <div className="app__bar bar">
                <header className="bar__header">
                    <h1 className="bar__title">team board</h1>
                    <div className="bar__wrapper">
                        <button
                            className="bar__btn bar__btn--add"
                            onClick={handleTaskAdding}
                            title="create new task"
                            type="button"
                        >
                            new task
                        </button>
                        <button
                            className="bar__btn bar__btn--clear"
                            onClick={handleClear}
                            title="clear board"
                            type="button"
                            disabled={tasks.length === 0}
                        >
                            clear board
                        </button>
                    </div>
                </header>
            </div>
            <TasksContext.Provider value={tasks}>
                <EditContext.Provider value={dispatch}>
                    <Board />
                    <ModalWithContent />
                </EditContext.Provider>
            </TasksContext.Provider>
        </div>
    );
};

export default Kanban;
