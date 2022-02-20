import React from 'react';
import {useRecoilValue} from "recoil";
import {Spacer} from "@geist-ui/core";
import {TodoItem, TodoItemCreator, TodoListFilters, TodoListStats} from './components';
import {filteredTodoListState} from "./selectors";


const TodoList = () => {
    const todoList = useRecoilValue(filteredTodoListState);

    return (
        <>
            <TodoListStats/>
            <TodoListFilters/>
            <TodoItemCreator/>
            <Spacer/>
            {todoList.map((todoItem) => (
                <TodoItem key={todoItem.id} item={todoItem}/>
            ))}
        </>
    );
};

export default TodoList;