import React, { useContext } from 'react';
import { getColumnTasksQuantity, createFilteredTasksList } from '../helpers/helpersFunctions';
import { TasksContext } from '../context';
import Task from './Task';
import './Column.css';

const Column = (props) => {
    const {
        data: { id, name, limit, isDivided },
    } = props;

    const tasks = useContext(TasksContext);

    const renderTasks = (is2ColLayout, isDoing = false) => {
        const tasksList = createFilteredTasksList(is2ColLayout, isDoing, tasks, id);
        return tasksList.map((task) => <Task data={task} key={task.id} />);
    };

    const render1ColLayout = () => (
        <ul className="column__sublist column__sublist--1col">
            <li className="column__subheader" />
            {renderTasks(isDivided)}
        </ul>
    );

    const render2ColLayout = () => (
        <>
            <ul className="column__sublist column__sublist--doing">
                <li className="column__subheader">doing</li>
                {renderTasks(isDivided, true)}
            </ul>
            <ul className="column__sublist column__sublist--done">
                <li className="column__subheader">done</li>
                {renderTasks(isDivided)}
            </ul>
        </>
    );

    return (
        <li className="board__column column">
            <header className={`column__header column__header--${name}`}>
                <div className="column__wrapper">
                    <h2 className={`column__title column__title--${name}`}>{name}</h2>
                    <p className="column__info">
                        {getColumnTasksQuantity(tasks, id)} / {limit}
                    </p>
                </div>
            </header>
            <div
                className={
                    isDivided
                        ? 'column__list column__list--2col'
                        : 'column__list column__list--1col'
                }
            >
                {isDivided ? render2ColLayout() : render1ColLayout()}
            </div>
        </li>
    );
};

export default Column;
