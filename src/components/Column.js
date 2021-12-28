import React, { useContext } from 'react';
import { TasksContext } from '../context';
import Task from './Task';

const Column = (props) => {
    const {
        data: { id, name, limit, isDivided },
    } = props;

    const tasks = useContext(TasksContext);

    const columnTasksList = () => tasks.filter((task) => task.idColumn === id);

    const columnTasksQuantity = () => columnTasksList().length;

    const renderColumnSuheader = () => (
        <div className="column__subheader" style={{ display: 'flex' }}>
            <p className="column__description">doing</p>
            <p className="column__description">done</p>
        </div>
    );

    const createFilteredTasksList = (is2ColLayout, isDoing) => {
        let tasksList = columnTasksList();
        if (is2ColLayout && isDoing) {
            tasksList = columnTasksList().fliter((task) => task.isDoing);
        } else if (is2ColLayout && !isDoing) {
            tasksList = columnTasksList().filter((task) => !task.isDoing);
        }
        return tasksList;
    };

    const renderTasks = (is2ColLayout, isDoing = false) => {
        const tasksList = createFilteredTasksList(is2ColLayout, isDoing);
        return tasksList.map((task) => <Task data={task} key={task.id} />);
    };

    const render2ColLayout = () => (
        <>
            <ul className="column__sublist column__sublist--doing">
                {renderTasks(isDivided, true)}
            </ul>
            <ul className="column__sublist column__sublist--done">{renderTasks(isDivided)}</ul>
        </>
    );

    const render1ColLayout = () => (
        <ul className="column__sublist column__sublist--1col">{renderTasks(isDivided)}</ul>
    );

    return (
        <li className="board__column column">
            <header
                className={`column__header column__header--${name}`}
                style={{ minHeight: '150px' }}
            >
                <h2 className={`column__title column__title--${name}`}>{name}</h2>
                <p className="column__info">
                    {columnTasksQuantity()} / {limit}
                </p>
                {isDivided ? renderColumnSuheader() : null}
            </header>
            <div
                className="column__list"
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                {isDivided ? render2ColLayout() : render1ColLayout()}
            </div>
        </li>
    );
};

export default Column;
