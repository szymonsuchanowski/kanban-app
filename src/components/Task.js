import React, { useContext } from 'react';
import { ColumnsContext, EditContext, TasksContext } from '../context';
import { useModal } from '../hooks';
import { TASKS_ACTIONS } from '../helpers/actions';
import {
    setFullColumnInfo,
    isNavBtnDisabled,
    getColumnById,
    isColumnDivided,
    getFollowingColumnId,
    isColumnFull,
    setDateFormat,
    setDeadlineClassName,
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

    const handleTaskMove = (direction) => {
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

    const renderDescription = () => {
        if (message) {
            return (
                <p className="item__info">
                    <span className="item__label">
                        <i className="fas fa-info item__icon" />
                    </span>
                    <span className="item__description">{message}</span>
                </p>
            );
        }
        return null;
    };

    const renderDeadline = () => {
        if (date) {
            return (
                <p className={setDeadlineClassName(date, idColumn, columns)}>
                    <i className="fas fa-hourglass-end item__icon item__icon--deadline" />
                    {setDateFormat(date)}
                </p>
            );
        }
        return null;
    };

    const renderItemInfo = () => (
        <>
            <header className="item__header">
                <h3 className="item__name">{taskName}</h3>
                {renderDeadline()}
            </header>
            <div className="item__detail">
                <p className="item__info">
                    <span className="item__label">
                        <i className="fas fa-user-ninja item__icon" />
                    </span>
                    <span className="item__description">{owner}</span>
                </p>
                <p className="item__info">
                    <span className="item__label">
                        <i className="fas fa-at item__icon" />
                    </span>
                    <span className="item__description">
                        <a className="item__link" href={`mailto:${email}`}>
                            {email}
                        </a>
                    </span>
                </p>
                {renderDescription()}
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
                        className="item__btn item__btn--nav"
                        onClick={() => handleTaskMove('prev')}
                        type="button"
                        title="move to previous section"
                        disabled={isNavBtnDisabled('prev', columns, idColumn)}
                    >
                        <i className="fas fa-arrow-left item__icon" />
                    </button>
                    <button
                        className="item__btn item__btn--remove"
                        onClick={() => handleRemove()}
                        type="button"
                        title="remove task"
                    >
                        <i className="far fa-trash-alt item__icon item__icon" />
                    </button>
                    <button
                        className="item__btn item__btn--nav"
                        onClick={() => handleTaskMove('next')}
                        type="button"
                        title="move to next section"
                        disabled={isNavBtnDisabled('next', columns, idColumn)}
                    >
                        <i className="fas fa-arrow-right item__icon" />
                    </button>
                </footer>
            </article>
            <ModalWithContent />
        </li>
    );
};

export default Task;
