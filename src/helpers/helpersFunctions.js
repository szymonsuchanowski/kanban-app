import fields from '../data/formFieldsData';

export const convertArrToObj = (arr) => Object.assign({}, ...arr);

export const getInputsNames = () => fields.map((field) => field.name);

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

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
    const columnTasksQuantity = tasks.filter((task) => task.idColumn === columnId).length;
    return limit === columnTasksQuantity;
};
