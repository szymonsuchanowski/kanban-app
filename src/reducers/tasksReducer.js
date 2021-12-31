import { v4 as uuid } from 'uuid';
import { TASKS_ACTIONS } from '../helpers/actions';

const createNewTask = ({ name, owner }) => ({
    id: uuid(),
    name,
    owner,
    isDoing: false,
    idColumn: 1,
});

const tasksReducer = (tasks, action) => {
    const { type } = action;
    switch (type) {
        case TASKS_ACTIONS.ADD: {
            return [...tasks, createNewTask(action.payload.taskData)];
        }
        case TASKS_ACTIONS.MOVE: {
            const {
                payload: { id, ...rest },
            } = action;
            return tasks.map((task) => (task.id === id ? { ...task, ...rest } : task));
        }
        case TASKS_ACTIONS.REMOVE: {
            const { payload } = action;
            return tasks.filter((task) => task.id !== payload);
        }
        case TASKS_ACTIONS.CLEAR_BOARD:
            return [];
        default:
            return tasks;
    }
};

export default tasksReducer;
