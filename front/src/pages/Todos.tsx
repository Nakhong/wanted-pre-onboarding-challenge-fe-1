import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseAxios, deleteTodo } from "../api";
import TodoItem from "./TodoItem";
import { createTodo, getTodos } from "../api";

export interface todo {
  title?: string;
  content?: string;
  id: string;
  children?: string;
  onClick?: () => {};
  onDelete(): void;
}

function Todos() {
  const nav = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLInputElement>(null);
  const [todolist, setTodolist] = useState<todo[]>([]);

  // get
  useEffect(() => {
    getTodos().then((res) => {
      const data: todo[] = res.data.data;
      setTodolist(data);
    });
  }, []);
  // delete
  const onDelete = (id: string) => {
    setTodolist((prev) => prev.filter((todo) => todo.id != id));
    deleteTodo(id);
  };

  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  // post
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const title = titleRef.current!.value;
      const content = contentsRef.current!.value;
      const data = { title, content };

      const newTodo: todo = await baseAxios
        .post("/todos", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          return res.data.data;
        });
      setTodolist([...todolist, newTodo]);
      titleRef.current!.value = "";
      contentsRef.current!.value = "";
    },
    [todolist]
  );

  return (
    <div>
      <div>
        <h1>Todo List</h1>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
      <form onSubmit={onSubmit}>
        <input ref={titleRef} type="text" id="todoInput" placeholder="제목" />
        <input type="text" placeholder="오늘 할 일" ref={contentsRef} />
        <button type="submit">추가</button>
      </form>
      <ul>
        {todolist.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onDelete={() => onDelete(todo.id)}
            ></TodoItem>
          );
        })}
      </ul>
    </div>
  );
}

export default Todos;
