import React from 'react';
import { v4 as uuid } from 'uuid';
import fields from '../data/formFieldsData';

export const getColumnTasksList = (tasks, id) => tasks.filter((task) => task.idColumn === id);

export const getColumnTasksQuantity = (tasks, id) => getColumnTasksList(tasks, id).length;

export const setFullColumnInfo = (columnName) => (
    <p className="modal__paragraph">Oops, column {columnName} is already full.</p>
);

export const createFilteredTasksList = (is2ColLayout, isDoing, tasks, id) => {
    if (is2ColLayout && isDoing) {
        return getColumnTasksList(tasks, id).filter((task) => task.isDoing);
    }
    if (is2ColLayout && !isDoing) {
        return getColumnTasksList(tasks, id).filter((task) => !task.isDoing);
    }
    return getColumnTasksList(tasks, id);
};

export const getColumnById = (columnId, columns) => columns.filter((col) => col.id === columnId);

export const isColumnDivided = (column) => column.isDivided;

export const getFollowingColumnId = (direction, columnId) =>
    direction === 'next' ? columnId + 1 : columnId - 1;

export const isColumnFull = (column, columnId, tasks) => {
    const { limit } = column;
    const tasksInColumnQuantity = tasks.filter((task) => task.idColumn === columnId).length;
    return limit === tasksInColumnQuantity;
};

export const setDateFormat = (date) => date.split('-').reverse().join('.');

export const convertArrToObj = (arr) => Object.assign({}, ...arr);

export const getInputsNames = () => fields.map((field) => field.name);

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

export const createStateData = () =>
    fields.map((field) => {
        const { name } = field;
        return {
            [name]: {
                value: '',
                isValid: false,
                isFill: false,
            },
        };
    });

export const createInitStateObj = () => convertArrToObj(createStateData());

export const getCurrentDate = () => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    return new Date(Date.now() - timezoneOffset).toISOString().slice(0, 10);
};

export const createNewTask = ({ taskName, owner, email, date, message }) => ({
    id: uuid(),
    taskName,
    owner,
    email,
    date,
    message,
    isDoing: false,
    idColumn: 1,
});

export const sortTasksByDate = (taskData) =>
    taskData.sort((a, b) => {
        if (!a.date && !b.date) {
            return 0;
        }
        if (!a.date) {
            return 1;
        }
        if (!b.date) {
            return -1;
        }
        return a.date < b.date ? -1 : 1;
    });

export const setNavClassName = (direction, columns, columnId) => {
    let additionalClassName = `item__nav--${direction}`;
    if (
        (direction === 'prev' && columnId === 1) ||
        (direction === 'next' && columnId === columns.length)
    ) {
        additionalClassName = 'item__nav--invisible';
    }
    return `item__nav ${additionalClassName}`;
};

export const setDeadlineClassName = (deadlineDate, idColumn, columns) => {
    const currTime = new Date(getCurrentDate()).getTime();
    const deadlineTime = new Date(deadlineDate).getTime();
    const daysDifference = (deadlineTime - currTime) / (24 * 60 * 60 * 1000);
    return daysDifference <= 2 && idColumn !== columns.length
        ? 'item__deadline item__deadline--important'
        : 'item__deadline';
};

export const setFieldClassName = (inputName, formState, fieldType) => {
    if (formState[inputName].isValid && formState[inputName].isFill) {
        return `form__${fieldType} form__${fieldType}--valid`;
    }
    if (!formState[inputName].isValid && formState[inputName].isFill) {
        return `form__${fieldType} form__${fieldType}--invalid`;
    }
    return `form__${fieldType}`;
};
