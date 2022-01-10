import React, { useContext } from 'react';
import {
    getColumnTasksQuantity,
    createFilteredTasksList,
    setColumnClassName,
} from '../helpers/helpersFunctions';
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
        <div className="column__1col">
            <span className="column__subheader" />
            <ul className="column__list column__list--1col">{renderTasks(isDivided)}</ul>
        </div>
    );

    const render2ColLayout = () => (
        <>
            <div className="column__2col">
                <span className="column__subheader">doing</span>
                <ul className="column__list column__list--doing">{renderTasks(isDivided, true)}</ul>
            </div>
            <div className="column__2col">
                <span className="column__subheader">done</span>
                <ul className="column__list column__list--done">{renderTasks(isDivided)}</ul>
            </div>
        </>
    );

    const renderColumn = () => (
        <div className={setColumnClassName(isDivided)}>
            {isDivided ? render2ColLayout() : render1ColLayout()}
        </div>
    );

    const renderNoTaskMsg = () => (
        <div className="column__placeholder">
            <p className="column__msg">no tasks</p>
        </div>
    );

    return (
        <li className="board__column column">
            <header className={`column__header column__header--${name}`}>
                <div className="column__wrapper">
                    <h2 className="column__title">{name}</h2>
                    <p className="column__info">
                        {getColumnTasksQuantity(tasks, id)} / {limit}
                    </p>
                </div>
            </header>
            {tasks.length === 0 ? renderNoTaskMsg() : renderColumn()}
        </li>
    );
};

export default Column;
