import React, { useContext } from 'react';
import { ColumnsContext } from '../context';
import Column from './Column';
import './Board.css';

const Board = () => {
    const columns = useContext(ColumnsContext);
    return (
        <div className="app__board board">
            <ol className="board__container">
                {columns.map((col) => (
                    <Column key={col.name} data={col} />
                ))}
            </ol>
        </div>
    );
};

export default Board;
