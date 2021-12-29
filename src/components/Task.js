import React from 'react';

const Task = (props) => {
    const {
        data: { name, owner, idColumn },
        showModal,
    } = props;
    return (
        <li>
            {name}, {owner}, {idColumn}
            <button onClick={() => showModal(1)} type="button">
                open modal
            </button>
        </li>
    );
};

export default Task;
