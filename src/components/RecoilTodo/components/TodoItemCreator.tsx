import React, {ChangeEvent, useState} from 'react';
import {todoListState} from "../state";
import {useRecoilState, useSetRecoilState} from "recoil";

const TodoItemCreator = () => {
    const [inputValue, setInputValue] = useState('');
    const setTodoList = useSetRecoilState(todoListState);

    const addItem = () => {
        setTodoList((oldTodoList) => [
            ...oldTodoList,
            {
                id: getId(),
                text: inputValue,
                isComplete: false,
            },
        ]);
        setInputValue('');
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
    };

    return (
        <div>
            <input type="text" value={inputValue} onChange={onChange} />
            <button onClick={addItem}>Add</button>
        </div>
    );
};

// utility for creating unique Id
let id = 0;
function getId() {
    return id++;
}

export default TodoItemCreator;