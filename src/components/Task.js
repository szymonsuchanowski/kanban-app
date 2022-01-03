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
    setDateFormat,
    setDetailClassName,
} from '../helpers/helpersFunctions';
import Confirmation from './Confirmation';

const Task = (props) => {
    const {
        data: { id, taskName, owner, email, date, message, idColumn, isDoing },
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
        setContent(<Confirmation closeModal={closeModal} id={id} taskName={taskName} />);
        showModal();
    };

    const renderDeadline = (deadlineDate) => (
        <div className={setDetailClassName(deadlineDate)}>
            <p className="item__label">deadline</p>
            <p className="item__msg">{setDateFormat(deadlineDate)}</p>
        </div>
    );

    const renderMsg = () => (
        <div className="item__wrapper">
            <p className="item__label">description</p>
            <p className="item__msg">{message}</p>
        </div>
    );

    const renderAdditionalInfo = () => (
        <div className="item__details">
            {date ? renderDeadline(date) : null}
            {message ? renderMsg() : null}
        </div>
    );

    const checkAdditionalInfo = () => (date || message ? renderAdditionalInfo() : null);

    const renderItemInfo = () => (
        <div className="item__info">
            <h3 className="item__task">{taskName}</h3>
            <p className="item__owner">{owner}</p>
            <a className="item__email" href={`mailto:${email}`}>
                {email}
            </a>
        </div>
    );

    return (
        <li className="column__item item">
            {renderItemInfo()}
            {checkAdditionalInfo()}
            <button onClick={() => handleRemove()} type="button" title="remove task">
                remove task
            </button>
            <span
                className={setNavClass('prev', columns, idColumn)}
                onClick={() => handleMove('prev')}
                role="button"
                title="move to previous section"
                aria-hidden
            >
                &lt;
            </span>
            <span
                className={setNavClass('next', columns, idColumn)}
                onClick={() => handleMove('next')}
                role="button"
                title="move to next section"
                aria-hidden
            >
                &gt;
            </span>
            <ModalWithContent />
        </li>
    );
};

export default Task;
