import React from 'react';
import fields from '../data/formFieldsData';

export const getColumnTasksList = (tasks, id) => tasks.filter((task) => task.idColumn === id);

export const getColumnTasksQuantity = (tasks, id) => getColumnTasksList(tasks, id).length;

export const setFullColumnInfo = (columnName) => (
    <p className="modal__paragraph">Ooops, column {columnName} is already full.</p>
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

export const setNavClass = (direction, columns, columnId) => {
    let additionalClassName = `item__nav--${direction}`;
    if (
        (direction === 'prev' && columnId === 1) ||
        (direction === 'next' && columnId === columns.length)
    ) {
        additionalClassName = 'item__nav--invisible';
    }
    return `item__nav ${additionalClassName}`;
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

export const convertArrToObj = (arr) => Object.assign({}, ...arr);

export const getInputsNames = () => fields.map((field) => field.name);

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

export const createStateData = () =>
    fields.map((field) => {
        const { name } = field;
        return {
            [name]: {
                value: '',
                isValid: true,
                isFill: false,
            },
        };
    });

export const createInitStateObj = () => convertArrToObj(createStateData());
