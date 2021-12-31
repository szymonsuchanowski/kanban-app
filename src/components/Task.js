import React, { useContext } from 'react';
import { ColumnsContext, EditContext, TasksContext } from '../context';
import { useModal } from '../hooks';
import { TASKS_ACTIONS } from '../helpers/actions';
import {
    setFullColumnInfo,
    setNavClass,
    getColumnById,
    isColumnDivided,
    getFollowingColumnId,
    isColumnFull,
} from '../helpers/helpersFunctions';
import Confirmation from './Confirmation';

const Task = (props) => {
    const {
        data: { id, name, owner, idColumn, isDoing },
    } = props;

    const [ModalWithContent, showModal, closeModal, setContent] = useModal();

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

    const stopMove = (column) => {
        const columnName = column.name;
        setContent(setFullColumnInfo(columnName));
        showModal();
    };

    const moveOutsideColumn = (direction) => {
        const followingColumnId = getFollowingColumnId(direction, idColumn);
        const [followingColumn] = getColumnById(followingColumnId, columns);
        const isFollowingColumnFull = isColumnFull(followingColumn, followingColumnId, tasks);
        return isFollowingColumnFull
            ? stopMove(followingColumn)
            : moveTaskToColumn(direction, followingColumnId);
    };

    const moveInsideColumn = () =>
        moveTask({ type: TASKS_ACTIONS.MOVE, payload: { id, isDoing: !isDoing } });

    const handleMove = (direction) => {
        const [currentColumn] = getColumnById(idColumn, columns);
        const isCurrentColumnDivided = isColumnDivided(currentColumn);
        return isCurrentColumnDivided &&
            ((direction === 'next' && isDoing) || (direction === 'prev' && !isDoing))
            ? moveInsideColumn()
            : moveOutsideColumn(direction);
    };

    const handleRemove = () => {
        setContent(<Confirmation closeModal={closeModal} id={id} taskName={name} />);
        showModal();
    };

    return (
        <>
            <li className="column__item item">
                {name}, {owner}, {idColumn}
                <button onClick={() => handleRemove()} type="button">
                    remove task
                </button>
                <span
                    className={setNavClass('prev', columns, idColumn)}
                    onClick={() => handleMove('prev')}
                    role="button"
                    aria-hidden
                >
                    &lt;
                </span>
                <span
                    className={setNavClass('next', columns, idColumn)}
                    onClick={() => handleMove('next')}
                    role="button"
                    aria-hidden
                >
                    &gt;
                </span>
            </li>
            <ModalWithContent />
        </>
    );
};

export default Task;
