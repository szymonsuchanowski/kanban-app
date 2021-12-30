import React, { useContext } from 'react';
import { ColumnsContext } from '../context';
import Column from './Column';

const Board = (props) => {
    const { showModal } = props;
    const columns = useContext(ColumnsContext);
    return (
        <div className="app__board board">
            <ol
                className="board__container"
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                {columns.map((col) => (
                    <Column key={col.name} data={col} showModal={showModal} />
                ))}
            </ol>
        </div>
    );
};

export default Board;
