import React, {ChangeEvent, FC} from 'react';
import {useRecoilState} from "recoil";
import {todoListState} from "../state";
import {ITodo} from "../types";
import {Button, Checkbox, Input} from "@geist-ui/core";

interface TodoItemProps {
    item: ITodo
}

const TodoItem: FC<TodoItemProps> = ({item}) => {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const index = todoList.findIndex((listItem) => listItem === item);

    const editItemText = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            text: value,
        });

        setTodoList(newList);
    };

    const toggleItemCompletion = () => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            isComplete: !item.isComplete,
        });

        setTodoList(newList);
    };

    const deleteItem = () => {
        const newList = removeItemAtIndex(todoList, index);

        setTodoList(newList);
    };

    return (
        <div>
            <Input value={item.text} onChange={editItemText} />
            <Checkbox
                checked={item.isComplete}
                onChange={toggleItemCompletion}
            />
            <Button auto onClick={deleteItem}>X</Button>
        </div>
    );
};

function replaceItemAtIndex(arr: ITodo[], index: number, newValue: ITodo) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: ITodo[], index: number): ITodo[] {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default TodoItem;