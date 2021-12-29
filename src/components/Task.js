import React from 'react';

const Task = (props) => {
    const {
        data: { name, idColumn },
        showModal,
    } = props;
    return (
        <li>
            {name}, {idColumn}
            <button onClick={() => showModal(1)} type="button">
                open modal
            </button>
        </li>
    );
};

export default Task;
