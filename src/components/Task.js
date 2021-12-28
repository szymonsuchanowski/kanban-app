import React from 'react';

const Task = (props) => {
    const {
        data: { name, idColumn },
    } = props;
    return (
        <li>
            {name}, {idColumn}
        </li>
    );
};

export default Task;
