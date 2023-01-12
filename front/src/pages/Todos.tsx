import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  baseAxios,
  deleteTodo,
  getTodos,
  createTodo,
  updateTodos,
} from "../api";
import TodoItem from "./TodoItem";
import Container from "@mui/material/Container";
import FormDialog from "../components/FormDialog";

export interface todo {
  title?: string;
  content?: string;
  id: string;
  children?: string;
  onClick?: () => {};
  onDelete(): void;
  onUpdate: (data: any) => void;
  todoList?: any;
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
    setTodolist((prev) => prev.filter((todo) => todo.id !== id));
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

  // update
  const onUpdate = useCallback((todo: any) => {
    setTodolist((prev: any) =>
      prev.map((item: any) => (item.id === todo.id ? { ...item, todo } : item))
    );
    updateTodos(todo);
    // 서버 요청을 한번 더 보내야지 수정이 된다 ..??
    getTodos().then((res) => {
      const data: todo[] = res.data.data;
      setTodolist(data);
    });
  }, []);

  return (
    <Container maxWidth="sm">
      <div>
        <h1>Todo List</h1>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
      <form onSubmit={onSubmit}>
        <input ref={titleRef} type="text" id="todoInput" placeholder="할일" />
        <input type="text" placeholder="자세한 내용" ref={contentsRef} />
        <button type="submit">추가</button>
      </form>
      <ul>
        {todolist.map((todo) => {
          return (
            <div>
              <TodoItem
                key={todo.id}
                todoList={todo}
                {...todo}
                onDelete={() => onDelete(todo.id)}
                onUpdate={onUpdate}
              ></TodoItem>
            </div>
          );
        })}
      </ul>
    </Container>
  );
}

export default Todos;
