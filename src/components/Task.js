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
import './Task.css';

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

    const checkDescription = () =>
        message ? <p className="item__description">{message}</p> : null;

    const renderDeadline = () => (
        <p className={setDetailClassName(date, idColumn, columns)}>
            <i className="far fa-hourglass item__icon item__icon--deadline" /> {setDateFormat(date)}
        </p>
    );

    const checkDeadline = () => (date ? renderDeadline() : null);

    const renderItemInfo = () => (
        <>
            <header className="item__header">
                <h3 className="item__name">{taskName}</h3>
                {checkDeadline()}
            </header>
            <div className="item__info">
                <p className="item__owner">
                    <i className="far fa-user item__icon" /> {owner}
                </p>
                <p className="item__email">
                    <i className="far fa-envelope item__icon" />{' '}
                    <a className="item__link" href={`mailto:${email}`}>
                        {email}
                    </a>
                </p>
                {checkDescription()}
            </div>
        </>
    );

    return (
        <li className="column__item item">
            <span className="item__pin" />
            <article className="item__task">
                {renderItemInfo()}
                <footer className="item__footer">
                    <button
                        className="item__btn"
                        onClick={() => handleRemove()}
                        type="button"
                        title="remove task"
                    >
                        <i className="far fa-trash-alt item__icon item__icon--remove" />
                    </button>
                    <span
                        className={setNavClass('prev', columns, idColumn)}
                        onClick={() => handleMove('prev')}
                        role="button"
                        title="move to previous section"
                        aria-hidden
                    >
                        <i className="fas fa-arrow-left item__icon" />
                    </span>
                    <span
                        className={setNavClass('next', columns, idColumn)}
                        onClick={() => handleMove('next')}
                        role="button"
                        title="move to next section"
                        aria-hidden
                    >
                        <i className="fas fa-arrow-right item__icon" />
                    </span>
                </footer>
            </article>
            <ModalWithContent />
        </li>
    );
};

export default Task;
