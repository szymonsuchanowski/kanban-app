import React, { useContext } from 'react';
import { ColumnsContext } from '../context';
import Column from './Column';
import './Board.css';

const Board = () => {
    const columns = useContext(ColumnsContext);
    return (
        <section className="app__board board">
            <ol className="board__list">
                {columns.map((col) => (
                    <Column key={col.name} data={col} />
                ))}
            </ol>
        </section>
    );
};

export default Board;
