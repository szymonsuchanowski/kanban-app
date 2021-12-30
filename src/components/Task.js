import React, { useContext } from 'react';
import { ColumnsContext, EditContext, TasksContext } from '../context';
import MODAL_TYPE from '../helpers/modalType';
import { TASKS_ACTIONS } from '../helpers/actions';
import {
    setNavClass,
    getColumnById,
    isColumnDivided,
    getFollowingColumnId,
    isColumnFull,
} from '../helpers/helpersFunctions';

const Task = (props) => {
    const {
        data: { id, name, owner, idColumn, isDoing },
        showModal,
    } = props;

    const tasks = useContext(TasksContext);
    const columns = useContext(ColumnsContext);
    const moveTask = useContext(EditContext);

    const moveTaskToColumn = (direction, followingColumnId) => {
        const setIsDoing = direction === 'next';
        return moveTask({
            type: TASKS_ACTIONS.MOVE,
            payload: { id, idColumn: followingColumnId, isDoing: setIsDoing },
        });
    };

    const stopMove = (columnId) => showModal(MODAL_TYPE.FULL_COLUMN, columnId);

    const moveOutsideColumn = (direction) => {
        const followingColumnId = getFollowingColumnId(direction, idColumn);
        const [followingColumn] = getColumnById(followingColumnId, columns);
        const isFollowingColumnFull = isColumnFull(followingColumn, followingColumnId, tasks);
        return isFollowingColumnFull
            ? stopMove(followingColumnId)
            : moveTaskToColumn(direction, followingColumnId);
    };

    const moveInsideColumn = () =>
        moveTask({ type: TASKS_ACTIONS.MOVE, payload: { id, isDoing: !isDoing } });

    const handleClick = (direction) => {
        const [currentColumn] = getColumnById(idColumn, columns);
        const isCurrentColumnDivided = isColumnDivided(currentColumn);
        if (
            isCurrentColumnDivided &&
            ((direction === 'next' && isDoing) || (direction === 'prev' && !isDoing))
        ) {
            return moveInsideColumn();
        }
        return moveOutsideColumn(direction);
    };

    return (
        <li className="column__item item">
            {name}, {owner}, {idColumn}
            <button onClick={() => showModal(MODAL_TYPE.REMOVE_TASK, id)} type="button">
                remove task
            </button>
            <span
                className={setNavClass('prev', columns, idColumn)}
                onClick={() => handleClick('prev')}
                role="button"
                aria-hidden
            >
                &lt;
            </span>
            <span
                className={setNavClass('next', columns, idColumn)}
                onClick={() => handleClick('next')}
                role="button"
                aria-hidden
            >
                &gt;
            </span>
        </li>
    );
};

export default Task;
