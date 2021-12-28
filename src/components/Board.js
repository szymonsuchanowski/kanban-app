import React, { useContext } from 'react';
import { ColumnsContext } from '../context';
import Column from './Column';

const Board = () => {
    const columns = useContext(ColumnsContext);
    return (
        <div>
            <ol style={{ display: 'flex', justifyContent: 'space-between' }}>
                {columns.map((col) => (
                    <Column key={col.name} data={col} />
                ))}
            </ol>
        </div>
    );
};

export default Board;
